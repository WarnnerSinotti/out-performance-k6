# Workflows

## Testes Performance (`k6.yml`)

Roda **apenas** os testes de Performance e Carga deste repositório.

- **Disparo:** workflow_dispatch, push ou PR na main
- **Jobs:** k6

## Pipeline completo (API → E2E → K6)

O pipeline completo está no repositório **out-test-pipeline**, que orquestra API + E2E + K6.