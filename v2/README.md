# Portal do Cidadão - Versão 2 (Layout Dividido)

## Descrição
Nova versão da página de login com layout dividido em duas seções, inspirada na imagem de referência. A interface apresenta um design moderno com abas de níveis de login e seções dedicadas para formulários e informações.

## Estrutura do Layout

### 🎨 **Layout Dividido**
- **Lado Esquerdo (Branco)**: Área de login com formulários
- **Lado Direito (Roxo)**: Área de informações e benefícios

### 📋 **Sistema de Abas - Níveis de Login**
1. **Nível 1**: Conta GOV.BR (Máxima Segurança)
2. **Nível 2**: Conta com CPF (Acesso Rápido)
3. **Nível 3**: Redes Sociais/Email (Conectividade)

## Características Principais

### **Design Moderno**
- Layout inspirado na imagem de referência
- Gradientes suaves e animações elegantes
- Sistema de abas intuitivo com numeração
- Interface responsiva e acessível

### **Área de Login (Esquerda)**
- **Header com Título**: "Entrar"
- **Abas de Níveis**: Sistema de navegação por níveis
- **Formulários Dinâmicos**: Conteúdo muda conforme a aba selecionada
- **Validações Completas**: CPF, email e senhas
- **Feedback Visual**: Alertas de sucesso, erro e carregamento

### **Área de Informações (Direita)**
- **Conteúdo Contextual**: Informações específicas de cada nível
- **Ícones Ilustrativos**: Representação visual de cada tipo de login
- **Lista de Benefícios**: Características de cada nível
- **Call-to-Action**: Botão para cadastro

## Níveis de Login

### **🛡️ Nível 1 - GOV.BR**
**Características:**
- Login com CPF e senha GOV.BR
- Máxima segurança governamental
- Acesso a todos os serviços públicos

**Formulário:**
- Campo CPF (formatação automática)
- Campo senha (com toggle)
- Link para esqueci senha
- Botão verde de login

**Informações:**
- Título: "Olá, cidadão!"
- Benefícios de segurança
- Botão de cadastro GOV.BR

### **🆔 Nível 2 - CPF**
**Características:**
- Login simplificado com CPF
- Processo rápido e direto
- Segurança garantida

**Formulário:**
- Campo CPF (validação completa)
- Campo senha
- Link para esqueci senha
- Botão azul de login

**Informações:**
- Título: "Acesso Rápido!"
- Benefícios de simplicidade
- Botão de cadastro

### **🌐 Nível 3 - Redes Sociais**
**Características:**
- Login com redes sociais
- Opção de email tradicional
- Múltiplas formas de acesso

**Formulário:**
- Botões sociais (Google, Facebook, LinkedIn)
- Divisor "ou"
- Campos email e senha
- Botão roxo de login

**Informações:**
- Título: "Conecte-se!"
- Benefícios de conectividade
- Botão de cadastro

## Funcionalidades Técnicas

### **Navegação por Abas**
- Clique nas abas para trocar de nível
- Atalhos de teclado (1, 2, 3)
- Animações suaves de transição
- Estado ativo visualmente destacado

### **Validações**
- **CPF**: Formatação automática e validação de dígitos
- **Email**: Validação de formato RFC
- **Senhas**: Mínimo 6 caracteres
- **Feedback**: Alertas contextuais

### **Interatividade**
- Toggle de visibilidade de senhas
- Botões de redes sociais funcionais
- Estados de loading durante processos
- Navegação por teclado

### **Responsividade**
- Layout em coluna para mobile
- Abas adaptadas para telas pequenas
- Textos e elementos redimensionados
- Experiência otimizada para todos os dispositivos

## Tecnologias

### **Frontend**
- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, animações, gradientes
- **JavaScript ES6+**: Interatividade e validações

### **Bibliotecas**
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter
- **CSS Gradients**: Efeitos visuais

## Estrutura de Arquivos
```
v2/
├── index.html          # Estrutura principal
├── styles.css          # Estilos e layout
├── script.js           # Interatividade
└── README.md           # Documentação
```

## Como Usar

1. **Navegar entre Níveis**: Clique nas abas ou use teclas 1, 2, 3
2. **Preencher Formulário**: Complete os campos do nível ativo
3. **Fazer Login**: Clique no botão correspondente
4. **Cadastrar**: Use o botão "CADASTRAR-SE" na área de informações

## Personalização

### **Cores por Nível**
```css
/* Nível 1 - Verde */
.level1-btn { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }

/* Nível 2 - Azul */
.level2-btn { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); }

/* Nível 3 - Roxo */
.level3-btn { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
```

### **Gradiente da Área de Informações**
```css
.info-section {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}
```

## Acessibilidade
- Contraste adequado (WCAG 2.1)
- Navegação por teclado
- Labels descritivos
- Estados de foco visíveis
- Feedback sonoro (screen readers)

## Performance
- CSS otimizado com seletores eficientes
- JavaScript modular e performático
- Animações com GPU acceleration
- Imagens otimizadas (quando aplicável)

## Compatibilidade
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

**Versão 2** - Layout dividido com sistema de abas por níveis
Desenvolvido com foco em usabilidade e experiência do usuário
