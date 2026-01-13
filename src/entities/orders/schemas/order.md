# 🧩 Representação modelo da entidade Order (Pedido)

> Campos marcados com \* são obrigatórios.

| **Propriedade**                 | **Tipo**      | **Obrigatório** | **Descrição / Exemplos / Valores possíveis**                   |
| ------------------------------- | ------------- | --------------- | -------------------------------------------------------------- |
| **order_id\***                  | UUID / number | ✅              | Identificador único do pedido. Ex.: `9283712`                  |
| Código do pedido (order_number) | string        | ❌              | Código amigável para o cliente. Ex.: `PED-2025-001928`         |
| **customer_id\***               | UUID          | ✅              | Identificador único do cliente na base de clientes             |
| Nome do cliente                 | string        | ❌              | Nome do comprador. Ex.: `"Lucas Ferreira"`                     |
| E-mail do cliente               | string        | ❌              | E-mail para contato e notificações. Ex.: `"cliente@email.com"` |
| Telefone do cliente             | string        | ❌              | Ex.: `"+55 11 99999-1111"`                                     |

---

## 🛒 Itens do Pedido (Order Items)

| **Propriedade**      | **Tipo** | **Obrigatório** | **Descrição / Exemplos / Valores possíveis**                                        |
| -------------------- | -------- | --------------- | ----------------------------------------------------------------------------------- |
| **items\***          | array    | ✅              | Lista de itens do pedido                                                            |
| ├── product_id\*     | UUID     | ✅              | Referência ao produto na entidade `Product`                                         |
| ├── EANCode          | string   | ❌              | Código EAN do produto no momento da compra. Ex.: `"7891234567895"`                  |
| ├── nome_do_produto  | string   | ❌              | Nome do produto na data do pedido (snapshot). Ex.: `"Notebook Lenovo ThinkPad E14"` |
| ├── quantidade\*     | int      | ✅              | Quantidade desse produto no pedido. Ex.: `2`                                        |
| ├── preço_unitário\* | number   | ✅              | Preço unitário praticado na data do pedido. Ex.: `3999.90`                          |
| └── subtotal         | number   | ❌              | `quantidade * preço_unitário`. Ex.: `7999.80`                                       |

> Observação: manter `nome_do_produto` e `EANCode` aqui ajuda na rastreabilidade histórica mesmo que o produto mude depois.

---

## 💰 Valores e Pagamento

| **Propriedade**        | **Tipo** | **Obrigatório** | **Descrição / Exemplos / Valores possíveis**                                     |
| ---------------------- | -------- | --------------- | -------------------------------------------------------------------------------- |
| subtotal_itens         | number   | ❌              | Soma de todos os subtotais dos itens (antes de descontos). Ex.: `7999.80`        |
| desconto_total         | number   | ❌              | Valor total de descontos aplicados. Ex.: `500.00`                                |
| frete_total            | number   | ❌              | Valor total de frete. Ex.: `35.90`                                               |
| impostos_total         | number   | ❌              | Valor total de impostos/TAX. Ex.: `600.00`                                       |
| **valor_total\***      | number   | ✅              | Valor final cobrado do cliente (`subtotal_itens - desconto + frete + impostos`). |
| moeda                  | string   | ❌              | Código da moeda. Ex.: `"BRL"`, `"USD"`                                           |
| **status_pagamento\*** | enum     | ✅              | `PENDENTE`, `PAGO`, `FALHOU`, `REEMBOLSO`, `CANCELADO`                           |
| forma_pagamento        | enum     | ❌              | `PIX`, `BOLETO`, `CARTAO_CREDITO`, `CARTAO_DEBITO`, `PAYPAL`, `OUTRO`            |
| transacao_id           | string   | ❌              | ID da transação no gateway de pagamento. Ex.: `"ch_1P0Xy5G..."`                  |
| parcelas               | int      | ❌              | Número de parcelas, se houver. Ex.: `10`                                         |

---

## 🚚 Entrega e Logística

| **Propriedade**        | **Tipo** | **Obrigatório** | **Descrição / Exemplos / Valores possíveis**                             |
| ---------------------- | -------- | --------------- | ------------------------------------------------------------------------ |
| **endereco_entrega\*** | object   | ✅              | Endereço de entrega informado no checkout                                |
| ├── rua\*              | string   | ✅              | Ex.: `"Rua das Flores"`                                                  |
| ├── número             | string   | ❌              | Ex.: `"123A"`                                                            |
| ├── complemento        | string   | ❌              | Ex.: `"Apto 45"`                                                         |
| ├── bairro             | string   | ❌              | Ex.: `"Bela Vista"`                                                      |
| ├── cidade\*           | string   | ✅              | Ex.: `"São Paulo"`                                                       |
| ├── estado\*           | string   | ✅              | Ex.: `"SP"`                                                              |
| ├── país               | string   | ❌              | Ex.: `"Brasil"`                                                          |
| └── cep                | string   | ❌              | Ex.: `"01041-000"`                                                       |
| status_entrega         | enum     | ❌              | `AGUARDANDO_ENVIO`, `ENVIADO`, `EM_TRANSITO`, `ENTREGUE`, `DEVOLVIDO`    |
| transportadora         | string   | ❌              | Nome da transportadora. Ex.: `"Correios"`, `"Jadlog"`                    |
| codigo_rastreio        | string   | ❌              | Código de rastreio. Ex.: `"BR1234567890"`                                |
| endereço_no_estoque    | string   | ❌              | Localização física no estoque para separação. Ex.: `"AR-01-PR-03-NV-02"` |

---

## 🔗 Relacionamentos e Metadados

| **Propriedade**  | **Tipo**  | **Obrigatório** | **Descrição / Exemplos / Valores possíveis**                                            |
| ---------------- | --------- | --------------- | --------------------------------------------------------------------------------------- |
| invoice_id       | UUID      | ❌              | Referência da invoice / nota fiscal associada ao pedido                                 |
| origem_pedido    | enum      | ❌              | `SITE`, `APP`, `MARKETPLACE`, `INTEGRACAO_API`, `BACKOFFICE`                            |
| total_itens      | int       | ❌              | Quantidade total de itens (somatório das quantidades dos itens). Ex.: `5`               |
| notas_do_cliente | string    | ❌              | Comentários inseridos pelo cliente no checkout                                          |
| notas_internas   | string    | ❌              | Comentários internos da operação (ex.: pendência de estoque, contato com cliente, etc.) |
| status_pedido    | enum      | ❌              | `CRIADO`, `EM_PROCESSAMENTO`, `APROVADO`, `CANCELADO`, `FINALIZADO`                     |
| Criado em        | timestamp | ❌              | Data/hora de criação do registro                                                        |
| Atualizado em    | timestamp | ❌              | Data/hora da última atualização                                                         |
