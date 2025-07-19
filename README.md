# Arquitetura Limpa — Camadas e Padrões

A Clean Architecture organiza o sistema em camadas concêntricas, separando responsabilidades e facilitando manutenção, testes e evolução. Além das camadas clássicas, projetos reais utilizam padrões auxiliares como factories, helpers, gateways, presenters, entre outros.

## Camadas Principais

### 1. **Domínio (`src/domain/`)**

- **Função:** Núcleo do sistema, contém entidades, objetos de valor, regras de negócio, eventos e interfaces.
- **Exemplos:**
  - **Entidades:** `Product`, `Customer`, `Order`
  - **Objetos de Valor:** `Address`
  - **Interfaces:** `ProductRepositoryInterface`
  - **Eventos:** `ProductCreatedEvent`
  - **Factories:** `ProductFactory`, `CustomerFactory` (criam instâncias de entidades de forma padronizada)
  - **Validações:** `CustomerValidatorFactory` (fábrica de validadores para entidades)
- **Padrões comuns:**
  - **Factory:** Criação de objetos complexos ou variantes (ex: produtos de tipos diferentes).
  - **Service:** Lógica de domínio que não pertence a uma entidade específica (ex: `OrderService`).

### 2. **Casos de Uso (`src/usecase/`)**

- **Função:** Orquestram as regras de negócio para atender requisitos da aplicação (ex: criar, buscar, listar, atualizar entidades).
- **Exemplos:** `CreateProductUseCase`, `FindCustomerUseCase`
- **Padrões comuns:**
  - **DTOs:** Objetos de transferência de dados para entrada/saída dos casos de uso.
  - **Output Mappers:** Transformam entidades em formatos de saída esperados.

### 3. **Interface/Adaptadores (`src/infrastructure/`)**

- **Função:** Implementam detalhes de interface, como persistência, APIs, integração com frameworks, etc.
- **Exemplos:**
  - **Repositórios:** Implementações concretas das interfaces do domínio, usando ORM (ex: `ProductRepository` com Sequelize).
  - **Models ORM:** Mapeamento das entidades para tabelas do banco (ex: `ProductModel`).
  - **API:** Rotas e controladores HTTP (ex: `express.ts`, `customer.route.ts`).
  - **Presenters:** Adaptam a saída dos casos de uso para formatos específicos de resposta (ex: `CustomerPresenter`).
- **Padrões comuns:**
  - **Gateway:** (Não há um gateway explícito neste projeto, mas gateways são usados para abstrair integrações externas, como serviços de pagamento, APIs de terceiros, etc. Caso precise integrar, crie uma interface no domínio e uma implementação concreta na infraestrutura.)
  - **API Layer:** Camada de entrada HTTP, responsável por receber requisições, acionar casos de uso e retornar respostas.
  - **Presenter:** Adapta a resposta do caso de uso para o formato esperado pela API ou UI.

### 4. **Infraestrutura Externa**

- **Função:** Frameworks, bancos de dados, serviços externos, bibliotecas utilitárias.
- **Exemplos:** Express, Sequelize, SQLite, bibliotecas de validação (`yup`), etc.

---

## Outros Padrões e Componentes

### **Factories**

- **O que são:** Classes/funções para criar instâncias de entidades, objetos de valor ou validadores.
- **Exemplo:** `ProductFactory.create(type, name, price)` retorna diferentes tipos de produto.

### **Helpers**

- **O que são:** Funções utilitárias para lógica auxiliar, formatação, cálculos, etc.
- **No projeto:** Não há helpers explícitos, mas podem ser criados em `src/domain/@shared/` ou `src/infrastructure/helpers/` conforme a necessidade.

### **Mixins**

- **O que são:** Técnicas para compartilhar funcionalidades entre classes sem herança direta.
- **No projeto:** Não há uso explícito de mixins, mas podem ser aplicados para adicionar comportamentos comuns a múltiplas entidades ou serviços.

### **Gateways**

- **O que são:** Interfaces e implementações para comunicação com sistemas externos (pagamentos, e-mails, APIs de terceiros).
- **No projeto:** Não há gateways explícitos, mas a arquitetura permite sua inclusão criando uma interface no domínio e uma implementação na infraestrutura.

### **API Layer**

- **O que é:** Camada responsável por receber requisições HTTP, acionar casos de uso e retornar respostas.
- **Exemplo:** `src/infrastructure/api/express.ts`, `src/infrastructure/api/routes/customer.route.ts`

### **Presenters**

- **O que são:** Adaptam a saída dos casos de uso para o formato esperado pela camada de apresentação (API, UI, etc).
- **Exemplo:** `src/infrastructure/api/presenters/customer.presenter.ts`

### **Event Dispatcher/Handlers**

- **O que são:** Permitem disparar e tratar eventos de domínio de forma desacoplada.
- **Exemplo:** `EventDispatcher`, `SendEmailWhenProductIsCreatedHandler`

---

## Resumo Visual

```
+--------------------------+
|   Infraestrutura Externa |  <- Frameworks, DB, serviços externos
+--------------------------+
| Infraestrutura/Adaptador |  <- API, Repositórios, Presenters, Gateways
+--------------------------+
|      Casos de Uso        |  <- Orquestra regras de negócio
+--------------------------+
|         Domínio          |  <- Entidades, Objetos de Valor, Fábricas, Serviços, Eventos
+--------------------------+
```

---

## Dicas de Organização

- **Helpers:** Crie em `@shared/helpers` ou `infrastructure/helpers` para lógica utilitária.
- **Gateways:** Crie interface no domínio e implementação concreta na infraestrutura.
- **Factories:** Use para padronizar criação de objetos complexos ou variantes.
- **Mixins:** Use para compartilhar comportamento entre classes, se necessário.
- **API/Presenters:** Separe lógica de apresentação da lógica de negócio.

Se quiser exemplos práticos de cada padrão, posso detalhar com trechos de código do projeto!
