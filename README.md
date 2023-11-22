# auth-via-hash-and-salt

## Sumário

- [auth-via-hash-and-salt](#auth-via-hash-and-salt)
  - [Sumário](#sumário)
  - [Motivação](#motivação)
    - [Método `_generatePassword()`](#método-_generatepassword)
    - [Método `isPasswordCorrect(password: string): boolean`](#método-ispasswordcorrectpassword-string-boolean)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## Motivação

Este app é uma API Express.js que oferece uma estrutura sólida e eficiente para a implementação de autenticação por senha, utilizando técnicas avançadas de hash e salt. A seguir, detalhamos os métodos fundamentais incorporados nesta aplicação para assegurar a integridade e segurança das senhas.

### Método `_generatePassword()`

O método [`_generatePassword()`](./src/entity/User.ts#L50) é responsável por gerar o hash e o salt para uma senha fornecida. Antes de iniciar o processo, verifica se a senha é válida por meio do método `_isPasswordValid()`. Se a senha atende aos critérios estabelecidos, um salt exclusivo é gerado usando bytes aleatórios (utilizando `randomBytes(16)`) e convertido para uma representação hexadecimal. Em seguida, é aplicada a função de derivação de chave baseada em senha (PBKDF2) para criar o hash. O resultado é uma combinação única de hash e salt, que é armazenada para autenticação futura.

### Método `isPasswordCorrect(password: string): boolean`

O método [`isPasswordCorrect(password: string): boolean`](./src/entity/User.ts#L39) é utilizado para verificar se uma senha fornecida é correta. Utiliza a mesma função PBKDF2 para gerar o hash correspondente à senha fornecida e, em seguida, compara-o com o hash armazenado durante a geração da senha. Se os hashes coincidem, a senha é considerada correta, indicando uma autenticação bem-sucedida.

Esses métodos são essenciais para a segurança robusta do sistema de autenticação, garantindo que as senhas sejam armazenadas e verificadas de forma segura, utilizando técnicas modernas de criptografia. A implementação destes métodos proporciona uma base sólida para o desenvolvimento de sistemas de autenticação seguros e confiáveis.

Este foi o quinto repositório de código apresentado no [Curso Superior de TSI do IFMS](https://www.ifms.edu.br/campi/campus-aquidauana/cursos/graduacao/sistemas-para-internet/sistemas-para-internet) como requisito para obtenção da nota parcial das atividades da unidade curricular Web Services.

| [&larr; Repositório anterior](https://github.com/mdccg/dynamic-store-api) | Próximo repositório &rarr; |
|-|-|

## Pilha de tecnologia

| Papel | Tecnologia |
|-|-|
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |
| Framework de back-end | [Express](https://expressjs.com/pt-br/) |
| Banco de dados | [SQLite](https://www.sqlite.org/) |
| Mapeamento Objeto-Relacional | [TypeORM](https://typeorm.io/) |

## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);

3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Finalmente, execute o seguinte comando para executar o app:

Para npm:

```console
$ npm run start
```

Para Yarn:

```console
$ yarn start
```