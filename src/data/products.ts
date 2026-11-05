export type DepartmentSlug =
  | "tabacaria"
  | "eletronicos"
  | "perfumes"
  | "lazer";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  department: DepartmentSlug;
  filter: string;
  tagline?: string;
  scent?: string;
  ageRestricted?: boolean;
  accent?: string;
  highlight?: boolean;
};

export type Department = {
  slug: DepartmentSlug;
  title: string;
  description: string;
  href: string;
  ageRestricted?: boolean;
  accent: string;
  filters: string[];
};

export const departments: Department[] = [
  {
    slug: "tabacaria",
    title: "Tabacaria",
    description: "Sedas, piteiras, dichavadores e acessórios selecionados.",
    href: "/categoria/tabacaria",
    accent: "#8B5A2B",
    filters: ["Todos", "Sedas", "Piteiras", "Dichavadores", "Bandejas"],
  },
  {
    slug: "eletronicos",
    title: "Cigarros Eletrônicos",
    description: "Dispositivos, pods e descartáveis. Exclusivo 18+.",
    href: "/categoria/eletronicos",
    ageRestricted: true,
    accent: "#2A3A4A",
    filters: ["Todos", "Dispositivos", "Descartáveis", "Pods", "Acessórios"],
  },
  {
    slug: "perfumes",
    title: "Perfumes Árabes",
    description: "Fragrâncias orientais intensas e kits exclusivos.",
    href: "/categoria/perfumes",
    accent: "#4A2A5A",
    filters: ["Todos", "Masculino", "Feminino", "Unissex", "Kits"],
  },
  {
    slug: "lazer",
    title: "Espetinhos & Bebidas",
    description: "Cardápio quente e bebidas geladas para o seu momento.",
    href: "/categoria/lazer",
    accent: "#6B3A1F",
    filters: ["Todos", "Espetinhos", "Bebidas", "Combos"],
  },
];

export const products: Product[] = [
  {
    id: "seda-slim",
    name: "Seda Slim Premium",
    price: 6.5,
    description: "Folhas finas e resistentes, queima uniforme. Pacote com 50 folhas.",
    department: "tabacaria",
    filter: "Sedas",
    tagline: "Queima limpa e discreta",
    highlight: true,
    accent: "#8B5A2B",
  },
  {
    id: "piteira-vidro",
    name: "Piteira de Vidro 6mm",
    price: 18,
    description: "Vidro borossilicato, fácil de limpar. Acabamento fosco.",
    department: "tabacaria",
    filter: "Piteiras",
    accent: "#6B4423",
  },
  {
    id: "dichavador-alum",
    name: "Dichavador Alumínio 4 partes",
    price: 45,
    description: "Alumínio anodizado com tela e compartimento de pólen.",
    department: "tabacaria",
    filter: "Dichavadores",
    highlight: true,
    accent: "#A0784A",
  },
  {
    id: "bandeja-logo",
    name: "Bandeja Fogo na Seda",
    price: 39.9,
    description: "Bandeja metálica com logo dourada. Ideal para montagem.",
    department: "tabacaria",
    filter: "Bandejas",
    accent: "#C4A052",
  },
  {
    id: "seda-king",
    name: "Seda King Size",
    price: 8,
    description: "Formato king size, natural brown. Pacote com 32 folhas.",
    department: "tabacaria",
    filter: "Sedas",
    accent: "#7A4A28",
  },
  {
    id: "piteira-papel",
    name: "Piteiras de Papel (50un)",
    price: 4.5,
    description: "Piteiras pré-enroladas, tipagem firme.",
    department: "tabacaria",
    filter: "Piteiras",
    accent: "#5C4033",
  },
  {
    id: "pod-kit",
    name: "Kit Pod Pro",
    price: 129.9,
    description: "Dispositivo recarregável com cartucho incluso. Autonomia até 2 dias.",
    department: "eletronicos",
    filter: "Dispositivos",
    ageRestricted: true,
    highlight: true,
    tagline: "Recarregável e discreto",
    accent: "#3A4A5A",
  },
  {
    id: "desc-5000",
    name: "Descartável 5000 puffs",
    price: 89.9,
    description: "Sabores intensos, sem recarga. Pronto para usar.",
    department: "eletronicos",
    filter: "Descartáveis",
    ageRestricted: true,
    accent: "#2A3540",
  },
  {
    id: "pod-refill",
    name: "Pod Refil Mentol",
    price: 49.9,
    description: "Cartucho compatível com Kit Pod Pro. Sabor mentolado.",
    department: "eletronicos",
    filter: "Pods",
    ageRestricted: true,
    accent: "#1E3A3A",
  },
  {
    id: "cabo-usb",
    name: "Cabo USB-C",
    price: 19.9,
    description: "Cabo de carga rápida para dispositivos compatíveis.",
    department: "eletronicos",
    filter: "Acessórios",
    ageRestricted: true,
    accent: "#333333",
  },
  {
    id: "desc-uva",
    name: "Descartável Uva Ice",
    price: 79.9,
    description: "Sabor uva com leve gelo. Até 3000 puffs.",
    department: "eletronicos",
    filter: "Descartáveis",
    ageRestricted: true,
    accent: "#3A2A4A",
  },
  {
    id: "disp-slim",
    name: "Dispositivo Slim Metal",
    price: 159.9,
    description: "Corpo em alumínio, LED de nível de bateria.",
    department: "eletronicos",
    filter: "Dispositivos",
    ageRestricted: true,
    accent: "#4A4A4A",
  },
  {
    id: "oud-noir",
    name: "Oud Noir Intense",
    price: 189.9,
    description: "Oud intenso com fundo amadeirado. Longevidade excepcional.",
    department: "perfumes",
    filter: "Masculino",
    scent: "Amadeirado",
    highlight: true,
    accent: "#3A2040",
  },
  {
    id: "rosa-dubai",
    name: "Rosa de Dubai",
    price: 169.9,
    description: "Rosa otomana com âmbar doce. Feminino e marcante.",
    department: "perfumes",
    filter: "Feminino",
    scent: "Floral",
    accent: "#5A2040",
  },
  {
    id: "amber-gold",
    name: "Amber Gold",
    price: 149.9,
    description: "Âmbar dourado unissex, ideal para noite.",
    department: "perfumes",
    filter: "Unissex",
    scent: "Oriental",
    accent: "#5A4020",
  },
  {
    id: "kit-oriental",
    name: "Kit Oriental Trio",
    price: 299.9,
    description: "Três fragrâncias de 30ml: oud, âmbar e musk.",
    department: "perfumes",
    filter: "Kits",
    scent: "Kit",
    highlight: true,
    accent: "#4A3040",
  },
  {
    id: "musk-branco",
    name: "Musk Branco",
    price: 129.9,
    description: "Musk limpo e fresco, uso diário.",
    department: "perfumes",
    filter: "Unissex",
    scent: "Musk",
    accent: "#2A3040",
  },
  {
    id: "saffron-king",
    name: "Saffron King",
    price: 209.9,
    description: "Açafrão e couro. Presença masculina imediata.",
    department: "perfumes",
    filter: "Masculino",
    scent: "Especiado",
    accent: "#6A3020",
  },
  {
    id: "esp-fraldinha",
    name: "Espetinho de fraldinha",
    price: 8,
    description: "Fraldinha macia no ponto, tempero na medida. Servido quente.",
    department: "lazer",
    filter: "Espetinhos",
    tagline: "Carne macia, tempero na medida",
    highlight: true,
    accent: "#6B3A1F",
  },
  {
    id: "esp-queijo",
    name: "Espetinho de queijo coalho",
    price: 7,
    description: "Queijo coalho grelhado com orégano e um toque de mel.",
    department: "lazer",
    filter: "Espetinhos",
    accent: "#8B6A2F",
  },
  {
    id: "esp-coracao",
    name: "Espetinho de coração",
    price: 7.5,
    description: "Coração de frango temperado e grelhado na hora.",
    department: "lazer",
    filter: "Espetinhos",
    accent: "#5A2A1A",
  },
  {
    id: "esp-linguica",
    name: "Espetinho de linguiça",
    price: 6.5,
    description: "Linguiça artesanal na brasa.",
    department: "lazer",
    filter: "Espetinhos",
    accent: "#7A3A20",
  },
  {
    id: "beb-agua",
    name: "Água mineral",
    price: 3,
    description: "Água mineral gelada 500ml.",
    department: "lazer",
    filter: "Bebidas",
    accent: "#1A3A5A",
  },
  {
    id: "beb-refri",
    name: "Refrigerante lata",
    price: 5,
    description: "Lata 350ml bem gelada. Sabores variados.",
    department: "lazer",
    filter: "Bebidas",
    highlight: true,
    accent: "#3A1A1A",
  },
  {
    id: "beb-suco",
    name: "Suco natural 300ml",
    price: 8,
    description: "Suco da casa, feito na hora.",
    department: "lazer",
    filter: "Bebidas",
    accent: "#4A5A1A",
  },
  {
    id: "combo-duplo",
    name: "Combo 2 espetinhos + refri",
    price: 18,
    description: "Dois espetinhos à escolha + refrigerante lata.",
    department: "lazer",
    filter: "Combos",
    tagline: "O combo do momento",
    highlight: true,
    accent: "#8B4A1F",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export function getProductsByDepartment(slug: DepartmentSlug, filter?: string) {
  return products.filter(
    (p) =>
      p.department === slug &&
      (!filter || filter === "Todos" || p.filter === filter),
  );
}

export function getHighlights() {
  return products.filter((p) => p.highlight);
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
