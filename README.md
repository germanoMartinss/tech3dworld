# Tech3Dworld

Landing page de um estúdio de modelagem e impressão 3D, com **catálogo de produtos consumindo uma API REST própria**. O projeto começou como um protótipo gerado no [v0](https://v0.app) e foi revisado, refatorado e testado manualmente, etapa por etapa. A seção [O que a IA gerou e o que eu corrigi](#o-que-a-ia-gerou-e-o-que-eu-corrigi) documenta esse processo.

**Destaques**

- Catálogo com **TanStack Query + Axios** e os quatro estados de dados: carregando (skeleton), erro (com "tentar novamente"), vazio e sucesso.
- Filtro por categoria **guardado na URL** (`?categoria=decor`), com cache separado por categoria e sem o skeleton "piscando" na troca.
- **Route Handler** do Next.js (`/api/produtos`) com validação, tipagem compartilhada e uma collection do Postman com testes automatizados.
- **Server Components** por padrão; só as partes interativas são client components.
- Acessibilidade: navegação por teclado, foco visível, `aria-*` no menu e no filtro, avisos para leitores de tela e respeito a `prefers-reduced-motion`.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Linguagem | TypeScript 5 (`strict`) |
| Estilo | Tailwind CSS 4, shadcn/ui (Base UI), `next/font` |
| Dados | TanStack Query 5, Axios |
| Animação | Framer Motion (com `MotionConfig reducedMotion="user"`) e CSS |
| Qualidade | ESLint 9 (`eslint-config-next`: core-web-vitals + typescript) |
| API | Route Handler do Next.js, collection do Postman |

## Como rodar

Pré-requisitos: **Node.js 20+** e **npm**.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (checa tipos; falha com erro de TypeScript) |
| `npm start` | Serve o build de produção |
| `npm run lint` | ESLint |

### Simular os estados do catálogo (só em desenvolvimento)

Os parâmetros abaixo vão na URL **da página**: um interceptor do Axios os repassa para a API, que responde de verdade (status HTTP real). Em produção, a API os ignora.

| URL | Resultado |
|---|---|
| `/?atraso=3000#catalogo` | Carregando por 3 s (skeleton) |
| `/?simular=erro#catalogo` | Erro 500 → mensagem + "Tentar novamente" |
| `/?simular=vazio#catalogo` | Lista vazia |
| `/?atraso=12000#catalogo` | Timeout do Axios (10 s) |
| `/?categoria=decor#catalogo` | Catálogo já filtrado |

## API

### `GET /api/produtos`

| Query | Obrigatório | Valores |
|---|---|---|
| `categoria` | não | `chaveiros` · `decor` · `personalizados` |

**200**

```json
{
  "products": [
    {
      "id": "vaso-decorativo",
      "title": "Vaso Decorativo",
      "category": "decor",
      "description": "Geometrias únicas pra dar vida à estante.",
      "priceFrom": 45,
      "color": "blue",
      "icon": "flower"
    }
  ],
  "total": 1
}
```

**400**: categoria inválida

```json
{ "error": "Categoria inválida: \"brinquedos\". Use uma destas: chaveiros, decor, personalizados." }
```

```bash
curl "http://localhost:3000/api/produtos?categoria=chaveiros"
curl -i "http://localhost:3000/api/produtos?categoria=brinquedos"   # 400
```

### Postman

Importe [`postman/tech3dworld.postman_collection.json`](postman/tech3dworld.postman_collection.json) (**Import** → arrastar o arquivo). A collection usa a variável `baseUrl` (`http://localhost:3000`) e tem três requests com testes de status e formato da resposta: listar todos, filtrar por categoria e categoria inválida. Para rodar tudo de uma vez: **Run collection**.

## Estrutura de pastas

```
app/
├── api/produtos/route.ts     # Route Handler: GET com filtro e validação
├── layout.tsx                # Server Component: fontes, metadata, <Providers>
├── page.tsx                  # Monta as seções
└── globals.css               # Tema (tokens), neon, animações, reduced motion
components/
├── sections/                 # Uma seção por arquivo; só o Header é client
├── catalog/
│   ├── product-list.tsx      # client: useQuery, filtro na URL, 4 estados
│   ├── product-card.tsx      # card reutilizável
│   ├── category-filter.tsx   # ToggleGroup acessível
│   └── product-list-{skeleton,error,empty}.tsx
├── ui/                       # Componentes shadcn/ui (Button, Skeleton, Toggle, ToggleGroup)
├── providers.tsx             # client: QueryClient, MotionConfig, Devtools (dev)
├── reveal.tsx                # client: animação de entrada (framer-motion)
├── external-link.tsx         # link em nova aba com rel seguro + aviso sr-only
└── scroll-button.tsx         # client: botão flutuante
lib/
├── types.ts                  # Product, categorias (valor + tipo), respostas da API
├── data.ts                   # Dados mockados (fonte da API)
├── api.ts                    # Instância Axios, fetchProducts, describeError
├── product-icons.ts          # Nome do ícone (JSON) → componente
└── site.ts                   # Logo, e-mail, links do WhatsApp
postman/                      # Collection da API
```

## Decisões técnicas

**Server Components por padrão.** As seções estáticas são renderizadas no servidor e não enviam JavaScript. Só são client components o que precisa de estado ou de APIs do navegador: Header, lista de produtos, filtro, botão flutuante e o wrapper de animação. Como o framer-motion só roda no navegador, ele fica isolado em `<Reveal>`, que recebe o conteúdo já renderizado como `children` (composição / "ilhas").

**Uma API mesmo num site estático.** O front depende de um contrato (`{ products, total }`), não de onde os dados vêm. Quando o catálogo for para um banco ou CMS, só o `route.ts` muda. A validação acontece no servidor (400 para categoria inválida) e também no cliente (a URL inválida vira "Todos"), com papéis diferentes: integridade no servidor, experiência do usuário no cliente.

**Tipos como fonte única.** `productCategories` é um array `as const` e `ProductCategory` é derivado dele, então a validação em runtime e o tipo nunca divergem. Os produtos são JSON puro (o ícone é uma string mapeada para um componente), o que permite enviá-los pela API.

**TanStack Query.**
- `queryKey: ['products', { categoria }]`: cada categoria tem seu próprio cache e a busca é refeita sozinha quando a chave muda.
- `staleTime` de 1 minuto: um catálogo muda pouco.
- `placeholderData: keepPreviousData`: a lista anterior fica na tela, esmaecida e com `aria-busy`, enquanto a próxima categoria carrega. O skeleton aparece só quando não há nada para mostrar.
- `retry`: não repete erros 4xx (o pedido está errado) nem timeouts (o usuário já esperou o máximo); repete uma vez falhas 5xx e de rede.
- Log de erros centralizado em `QueryCache.onError`.

**Erros amigáveis.** `describeError()` separa a mensagem para o usuário (o que fazer) do detalhe técnico (status, motivo). Em produção, o detalhe vai só para o console; em desenvolvimento, aparece também na tela. O detalhe fica atrás de `process.env.NODE_ENV === 'development'` dentro do JSX, para o bundler removê-lo do build de produção (verificado no bundle).

**Filtro na URL com `replaceState`.** A URL é a fonte da verdade (não existe um `useState` paralelo): o link é compartilhável e sobrevive ao recarregar. `replaceState` não cria entradas no histórico, então o "Voltar" sai da página em vez de desfazer filtros. Como `useSearchParams` numa página estática exige `<Suspense>`, o fallback tem o mesmo formato do conteúdo (filtro desabilitado + skeleton), sem layout shift.

**Animações e acessibilidade de movimento.** O hero anima com CSS, que começa no primeiro paint, em vez de framer-motion, que esperaria o JavaScript hidratar e atrasaria o LCP. Abaixo da dobra, o framer-motion respeita `prefers-reduced-motion` via `MotionConfig`. O efeito neon é estático; a única animação contínua usa só `transform` e só roda com `prefers-reduced-motion: no-preference`.

## Acessibilidade

- Landmarks `header` / `main` / `footer` e hierarquia de títulos `h1 → h2 → h3`.
- Menu mobile: `aria-expanded`, `aria-controls`, Esc fecha e devolve o foco ao botão.
- Filtro: `role="group"`, `aria-pressed`, navegação por setas (roving tabindex) e anúncio do resultado em uma região `aria-live`.
- Foco visível (`:focus-visible`) em links e botões.
- Links externos com "(abre em nova aba)" para leitores de tela; os "Peça o seu" incluem o nome do produto.
- `prefers-reduced-motion` respeitado no CSS e no framer-motion.

## Performance

Medido no build de produção (`next start`, Chrome, sem cache):

| | Antes | Depois |
|---|---|---|
| Logo do hero | PNG 527 KB | AVIF ~20 KB (no tamanho da tela) |
| Total transferido | ~779 KB | ~348 KB |
| Fontes | não carregavam (fallback do sistema) | Inter + Space Mono via `next/font` (~67 KB) |
| CLS | 0 | 0 |

**Lighthouse** (mobile, aba anônima, build de produção, mediana de 3 execuções):

| | Antes | Depois |
|---|---|---|
| Performance | _preencher_ | _preencher_ |
| Acessibilidade | _preencher_ | _preencher_ |
| Boas práticas | _preencher_ | _preencher_ |
| SEO | _preencher_ | _preencher_ |
| LCP | _preencher_ | _preencher_ |
| CLS | _preencher_ | _preencher_ |
| TBT | _preencher_ | _preencher_ |

## O que a IA gerou e o que eu corrigi

O ponto de partida foi um protótipo gerado no v0. Usei IA também durante a refatoração, sempre validando o resultado com lint, build, comparação do HTML gerado e testes num navegador real (Chrome headless medindo estilos, tempos e requisições). Os problemas abaixo **compilavam sem erro**: só apareceram com teste.

| Problema | Como foi encontrado | Correção |
|---|---|---|
| `typescript.ignoreBuildErrors: true` no `next.config` | Leitura da configuração | Removido. O build volta a falhar com erro de tipo |
| `group-hover:` sem `group` no pai: a seta dos cards nunca se movia | Revisão do código | Classe `group` no card |
| `* { border-color }` fora de `@layer`: anulava **todas** as cores de borda do Tailwind v4 (inclusive hovers) | Teste de foco mediu cores de borda diferentes das classes | Regra movida para `@layer base`. 21 elementos voltaram à cor pretendida |
| Tema sem o token `--ring`: o anel de foco dos componentes shadcn era invisível | Inspeção do CSS gerado pelo CLI | Tokens `--ring` e `--input` no tema |
| Atraso escalonado dos cards ignorado (a `transition` da variante vence a prop) | Medição da opacidade dos cards a cada 40 ms | Atraso passado via `custom` para a variante |
| Botão "Tentando…" que nunca aparecia: `refetch` sem cache volta a query para `pending` | Teste no navegador + código-fonte do TanStack Query | Código removido |
| Detalhe de erro só para dev ia junto no bundle de produção | `grep` no `.next/static` | Checagem de `NODE_ENV` movida para dentro do JSX |
| Fontes declaradas no CSS, mas nunca carregadas | Medição das fontes carregadas | `next/font` |
| `priority` no `next/image` (depreciado no Next 16) e `images.unoptimized` | Documentação da versão instalada | `preload`, otimizador ligado (AVIF/WebP) |
| `next lint` (removido no Next 16) | Documentação da versão instalada | ESLint CLI com flat config |
| CLI do shadcn adicionou o pacote `cn` e um import fora do padrão do projeto | `--dry-run` e revisão do diff | Imports padronizados em `@/lib/utils`, pacote removido |
| `next@16.3.0` com vulnerabilidade crítica | `npm audit --omit=dev` | Atualizado para 16.3.8 (patch), sem `--force` |

## Próximos passos

- **Prefetch no servidor** com `prefetchQuery` + `HydrationBoundary`: hoje o HTML inicial sai com o skeleton e os produtos chegam pelo JavaScript. Com o prefetch, os produtos viriam no HTML (melhor para SEO e para o LCP do catálogo) sem perder o cache no cliente.
- Testes automatizados: unitários (`describeError`, `isProductCategory`, `route.ts`) e de componente para os quatro estados.
- Banco de dados ou CMS no lugar de `lib/data.ts`, e páginas de produto (`/produtos/[id]`).
- Serviço de monitoramento de erros (ex.: Sentry) em `QueryCache.onError`.
