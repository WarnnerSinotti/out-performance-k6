# K6

O K6 é uma ferramenta de teste de carga de código aberto e gratuita capaz de mensurar o desempenho das suas aplicações através da simulação de tráfego nos mais diversos cenários a partir de scripts.

## Características

- 🎯 Os scripts são escritos em **ES6 Javascript** (podendo adicionar **TypeScript**).
- 🔄 Permite o uso de um único script para executar testes em diferentes cenários.
- ⚡ Ferramenta de alto desempenho com consumo mínimo de recursos do sistema.
- 📊 Fornece relatórios como **JSON** e **CSV**.
- 🛠️ Possui extensões para **VS Code**, **IntelliJ** e **Intellisense**.
- 🔗 Fácil integração com ferramentas de **CI/CD**.

## Protocolos

O K6 suporta os seguintes protocolos:

- 🌐 **HTTP/1.1**
- 🌐 **HTTP/2**
- 🌐 **WebSockets**
- 🌐 **gRPC**

## Integrações

### Extensões

| Descrição          | IDE                                                                     |
| ------------------ | ----------------------------------------------------------------------- |
| Visual Studio Code | Visual Studio Code                                                      |
| IntelliJ IDEA      | IntelliJ                                                                |
| CI/CD              | Jenkins, Azure Pipelines, GitHub, GitLab, Bitbucket, Google Cloud Build |
| Output Test        | Datalog, Grafana, New Relic, JSON File, CSV e HTML                      |

## Arquitetura da Solução

Com uma arquitetura simples, não é necessário realizar configurações adicionais para a utilização do K6; é somente executá-lo em linha de comando para simular cenários reais. A ferramenta de linha de comando está disponível para **Windows**, **Linux** e **Mac**.

O K6 suporta um conjunto de métricas incorporadas e personalizadas que podem ser usadas para medir o desempenho de uma aplicação, a fim de verificar se ela alcança ou não as metas estabelecidas.

### Métricas

| Métrica                     | Tipo    | Descrição                                                                                                                                                   |
| --------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🚶‍♂️ vus                      | Gauge   | Número atual de usuários virtuais ativos.                                                                                                                   |
| ⏳ vus_max                  | Gauge   | Número máximo possível de usuários virtuais (os recursos VU são pré-alocados para garantir que o desempenho não seja afetado ao aumentar o nível de carga). |
| 🔄 iterations               | Counter | Agrega o número de vezes que as VUs executaram a função padrão no teste.                                                                                    |
| 📥 data_received            | Counter | A quantidade de dados recebidos.                                                                                                                            |
| 📤 data_sent                | Counter | A quantidade de dados enviados.                                                                                                                             |
| ✔️ checks                   | Rate    | Taxa de checagens fracassadas.                                                                                                                              |
| 📈 http_reqs                | Counter | Quantidade total de solicitações HTTP geradas pelo K6.                                                                                                      |
| ⏱️ http_req_blocked         | Trend   | Tempo gasto bloqueado (esperando por um slot de conexão TCP) antes de iniciar o http_req_looking_up.                                                        |
| 🕵️ http_req_looking_up      | Trend   | Tempo gasto na procura do nome de host remoto em DNS.                                                                                                       |
| 🔌 http_req_connecting      | Trend   | Tempo gasto para estabelecer conexão TCP com host remoto.                                                                                                   |
| 🔒 http_req_tls_handshaking | Trend   | Tempo gasto na sessão handshaking TLS com host remoto.                                                                                                      |
| 🚀 http_req_sending         | Trend   | Tempo gasto enviando dados para o host remoto.                                                                                                              |
| ⏳ http_req_waiting         | Trend   | Tempo gasto esperando resposta do host remoto.                                                                                                              |
| 📤 http_req_receiving       | Trend   | Tempo gasto recebendo dados de resposta do host.                                                                                                            |
| ⏰ http_req_duration        | Trend   | Duração total da requisição (http_req_sending + http_req_waiting + http_req_receiving).                                                                     |

## Composição do Teste

### Estrutura

A arquitetura de testes do K6 é composta por 4 etapas:

1. **Inicialização**: Import das funcionalidades do K6, como http, sleep, trend, etc.
2. **Configuração**: Parte de configuração, refere-se a parte de configurar o tipo de testes, quantos usuários, tempo de duração dos testes.
3. **Execução**: A execução é o loop para as requisições das funções.
4. **Desmontagem**: A desmontagem realiza a parte de métricas e análises após finalizar os testes. É a saída do resultado.

## Métricas

As métricas medem o desempenho de um sistema em condições de teste. O resultado das métricas pode ter os seguintes tipos:

| Tipo    | Descrição                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------- |
| Counter | Uma métrica que soma cumulativamente os valores adicionados.                                                         |
| Gauge   | Uma métrica que armazena os valores mínimos, máximos e os últimos valores adicionados.                               |
| Rate    | Uma métrica que rastreia a porcentagem de valores adicionados que não são zero.                                      |
| Trend   | Uma métrica que permite calcular estatísticas sobre os valores adicionados (mín, máx, média, mediana e porcentagem). |

## Tipo de Testes

| Tipo      | Descrição                                                                                     |
| --------- | --------------------------------------------------------------------------------------------- |
| 🚬 Smoke  | Verifica se o sistema pode lidar com carga mínima, sem falhas.                                |
| 📈 Carga  | Avalia o desempenho do sistema em termos de usuários simultâneos ou solicitações por segundo. |
| 🚧 Stress | Avalia os limites do sistema e a estabilidade sob condições extremas.                         |
| 🌊 Soak   | Informa sobre a confiabilidade e o desempenho do sistema por um longo período de tempo.       |

### Exemplos de Testes

1. **Smoke Test**:

   - VUS/Throughput: Baixo
   - Duração: Curta (segundos ou minutos)
   - Quando usar: Após mudanças relevantes no código do sistema ou da aplicação.

2. **Load Test**:

   - VUS/Throughput: Médio (similar à produção)
   - Duração: Média (5-60 minutos)
   - Quando usar: Para verificar se o sistema mantém o desempenho com uso médio.

3. **Stress Test**:

   - VUS/Throughput: Alto (acima da média)
   - Duração: Média (5-60 minutos)
   - Quando usar: Para verificar como o sistema responde e se recupera sob pressão.

4. **Soak Test**:

   - VUS/Throughput: Médio
   - Duração: Longa (horas)
   - Quando usar: Para verificar como o sistema se comporta sob uso contínuo prolongado.

5. **Spike Test**:

   - VUS/Throughput: Muito alto
   - Duração: Curta (alguns minutos)
   - Quando usar: Para verificar a capacidade do sistema de lidar com cargas de pico.

6. **Breakpoint Test**:
   - VUS/Throughput: Aumenta até a falha
   - Duração: Pelo tempo necessário
   - Quando usar: Para encontrar os limites superiores do sistema.

## Resultado

### Verificações

As verificações validam condições booleanas em seu teste, como validar se uma solicitação POST tem um `resposta.status == 201`.

### Thresholds

Os thresholds são os critérios de aprovação/reprovação definidos para as métricas de teste. Se o desempenho do sistema não atender às condições do limite, o teste terminará com um status de falha.

## Executar Testes

### Rodar os Testes via CI/CD

Os testes de carga podem ser executados via pipeline do GitHub através da função de workflow.

### Rodar os Testes via Terminal

Para rodar os testes no terminal, utilize o seguinte comando, estando no diretório exato do script de testes `nomearquivo.ts`:

```bash
k6 run nomearquivo.ts
```

## Rodar os Testes via Cloud/CLI

Para rodar os testes e apresentar os resultados graficamente no cloud do K6, utilize:

```bash
k6 cloud nomearquivo.ts
```

## 📊 Relatórios

As saídas dos resultados são exibidas no terminal e podem ser incluídas em relatórios visualmente pelo **Grafana Cloud**. Relatórios podem ser personalizados e extraídos via **HTML**.

## 📚 Documentação

Toda a documentação do K6 pode ser acessada pelo site oficial: [k6.io](https://k6.io/)

## 🌐 Extra

Podemos contar com o **K6 Grafana Cloud**, uma plataforma em nuvem com interface gráfica para medir os testes. Basta configurar no teste as credenciais de acesso para habilitar e rodar os testes com o **K6 Cloud**.

## ⚙️ Configuração

A configuração do token do **K6 Cloud/Grafana** para utilização pode ser encontrada [neste link](https://k6.io/docs/results-output/real-time/cloud/).

## 🔑 Acesso

Para acessar o **K6 Cloud/Grafana**, visite: [grafana.com](https://grafana.com/auth/sign-in/)

### Retornar README Principal

[README](../README.md).
