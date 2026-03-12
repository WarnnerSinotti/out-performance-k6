# Pipeline: Playwright → K6 → WebdriverIO

## Ordem de execução

1. **out-e2e-playwright** — E2E + testes integrados (Playwright)
2. **out-performance-k6** — Testes de performance (K6)
3. **out-e2e-webdriverIO** — Testes mobile (WebdriverIO)

## Onde o pipeline está

O arquivo `pipeline.yml` está em **out-performance-k6**. Ele roda em:
- Push/PR na branch `main` de out-performance-k6
- Disparo manual (`workflow_dispatch`)

## Repositórios necessários

Os 3 repositórios precisam existir na mesma organização:
- `SEU_ORG/out-e2e-playwright`
- `SEU_ORG/out-performance-k6`
- `SEU_ORG/out-e2e-webdriverIO`

## Ajustes por projeto

| Projeto | Comando de teste | Caminho dos artifacts |
|---------|------------------|------------------------|
| Playwright | `npm run test` | `playwright/test-results` |
| K6 | `npm run test-break` | `k6/src/reports/` |
| WebdriverIO | `npm run test` | `webdriver/allure-results` |

Altere no `pipeline.yml` conforme os scripts de cada projeto.

## Secrets

- `BASE_URL_TEST` (opcional): URL da API para K6. Se não for definido, usa JSONPlaceholder.

## Executar em outro repositório

Para rodar ao fazer push em **out-e2e-playwright** ou **out-e2e-webdriverIO**, copie o `pipeline.yml` para o `.github/workflows/` do respectivo repositório e adapte os triggers.
