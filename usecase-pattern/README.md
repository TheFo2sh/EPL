# C# use case Nx generator

Generates a C# use case and a matching [FastEndpoints](https://fast-endpoints.com/) endpoint in an existing Nx project.

## Install

From this directory:

```sh
npm install
npm run build
```

To use the generator from another Nx workspace, add this package as a local development dependency:

```sh
npm install --save-dev /absolute/path/to/usecase-pattern
```

The target C# project must reference FastEndpoints and register both FastEndpoints and the generated use case with dependency injection.

## Generate

```sh
npx nx generate @local/usecase-pattern:usecase CreateOrder --project=orders-api
```

By default, this creates:

```text
<project-root>/Features/CreateOrder/CreateOrderUseCase.cs
<project-root>/Features/CreateOrder/CreateOrderEndpoint.cs
```

Options:

```text
--namespace=Acme.Orders.Features.CreateOrder
--directory=Application/Features
--route=/orders
--method=Post
```

The generated endpoint uses FastEndpoints' normal authorization behavior. Add `AllowAnonymous()` in `Configure()` only when the route is intentionally public.