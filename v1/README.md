# Portal do Cidadão - Página de Login

## Descrição
Uma página de login moderna e elegante com três opções de autenticação:
- **GOV.BR**: Login utilizando a conta única do governo brasileiro
- **CPF**: Login utilizando CPF e senha
- **Email/Redes Sociais**: Login com email ou através de redes sociais (Google, Facebook, Microsoft)

## Características

### Design
- Interface inspirada no Instagram com design moderno e minimalista
- Layout responsivo que se adapta a diferentes tamanhos de tela
- Gradientes suaves e animações elegantes
- Tipografia moderna usando a fonte Inter
- Paleta de cores profissional e acessível

### Funcionalidades
- **Navegação Intuitiva**: Sistema de navegação entre opções e formulários
- **Validação de Dados**: 
  - Validação completa de CPF com dígitos verificadores
  - Validação de formato de email
  - Verificação de senha mínima
- **Formatação Automática**: CPF é formatado automaticamente durante a digitação
- **Feedback Visual**: Alertas de sucesso, erro e loading
- **Toggles de Senha**: Botões para mostrar/ocultar senhas
- **Integração Social**: Botões para login com redes sociais

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização com Flexbox, Grid, gradientes e animações
- **JavaScript ES6+**: Interatividade e validações
- **Font Awesome**: Ícones modernos
- **Google Fonts**: Tipografia Inter

## Estrutura do Projeto
```
fabio/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
└── README.md           # Documentação
```

## Como Usar

1. **Abrir a Página**: Abra o arquivo `index.html` em qualquer navegador moderno
2. **Escolher Opção de Login**: Clique em uma das três opções disponíveis
3. **Preencher Dados**: Complete o formulário correspondente
4. **Fazer Login**: Clique no botão de login para autenticar

## Opções de Login

### 1. GOV.BR
- Campo para CPF (com formatação automática)
- Campo para senha
- Links para recuperação de senha e criação de conta

### 2. CPF
- Campo para CPF (com validação completa)
- Campo para senha
- Sistema de autenticação local

### 3. Email/Redes Sociais
- Botões para login social (Google, Facebook, Microsoft)
- Formulário tradicional com email e senha
- Divisor visual entre opções sociais e email

## Validações Implementadas

### CPF
- Formatação automática (000.000.000-00)
- Validação de dígitos verificadores
- Verificação de CPFs conhecidamente inválidos

### Email
- Validação de formato RFC compliant
- Verificação de domínio básica

### Senha
- Mínimo de 6 caracteres
- Toggle para mostrar/ocultar

## Responsividade
A página é totalmente responsiva e se adapta a:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação de espaçamentos e tamanhos
- **Mobile**: Layout otimizado para telas pequenas

## Customização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #38a169;
    --error-color: #c53030;
}
```

### Fontes
Para alterar a fonte, modifique a importação no HTML e CSS:
```css
font-family: 'Inter', sans-serif;
```

## Acessibilidade
- Contraste adequado entre textos e fundos
- Navegação por teclado funcional
- Labels descritivos para campos de formulário
- Feedback visual e textual para ações

## Compatibilidade
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Melhorias Futuras
- Autenticação biométrica
- Modo escuro
- Internacionalização (i18n)
- Integração com APIs reais
- Dois fatores de autenticação (2FA)

## Licença
Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

---

Desenvolvido com ❤️ para o Portal do Cidadão
