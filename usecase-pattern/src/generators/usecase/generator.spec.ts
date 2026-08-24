import { addProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { describe, expect, it } from 'vitest';
import usecaseGenerator from './generator';

describe('usecase generator', () => {
  it('generates a use case and FastEndpoints endpoint', async () => {
    const tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'orders-api', {
      root: 'apps/orders-api',
      projectType: 'application',
      targets: {},
    });

    await usecaseGenerator(tree, {
      name: 'Create Order',
      project: 'orders-api',
    });

    const usecasePath = 'apps/orders-api/Features/CreateOrder/CreateOrderUseCase.cs';
    const endpointPath = 'apps/orders-api/Features/CreateOrder/CreateOrderEndpoint.cs';

    expect(tree.exists(usecasePath)).toBe(true);
    expect(tree.exists(endpointPath)).toBe(true);
    expect(tree.read(usecasePath, 'utf-8')).toContain(
      'namespace OrdersApi.Features.CreateOrder;',
    );
    expect(tree.read(endpointPath, 'utf-8')).toContain('Post("/api/create-order");');
  });

  it('honors endpoint and location options', async () => {
    const tree = createTreeWithEmptyWorkspace();
    addProjectConfiguration(tree, 'billing', {
      root: 'services/billing',
      projectType: 'application',
      targets: {},
    });

    await usecaseGenerator(tree, {
      name: 'GetInvoice',
      project: 'billing',
      directory: 'Application/Invoices',
      namespace: 'Acme.Billing.Invoices',
      route: '/invoices/{id}',
      method: 'Get',
    });

    const endpoint = tree.read(
      'services/billing/Application/Invoices/GetInvoice/GetInvoiceEndpoint.cs',
      'utf-8',
    );
    expect(endpoint).toContain('namespace Acme.Billing.Invoices;');
    expect(endpoint).toContain('Get("/invoices/{id}");');
  });
});