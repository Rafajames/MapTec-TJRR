# 🗺️ MapTec · TJRR

Encontre salas, setores, unidades e **códigos de transferência** dos prédios do Tribunal de Justiça do Estado de Roraima.

**Acesse:** https://rafajames.github.io/MapTec-TJRR/

O MapTec **não** tem plantas nem mapas internos: ele informa prédio, andar, número da sala, setor/unidade, código de transferência e o endereço do prédio (com atalho para o Google Maps).

## Como funciona

- Aplicação estática (HTML/CSS/JS) publicada no GitHub Pages. Sem login, sem banco de dados e sem chaves.
- **Os dados ficam em [`data/maptec.json`](data/maptec.json)** e são somente leitura para os visitantes. Quem atualiza é o mantenedor, por commit.
- Pesquisa global (sala, setor, unidade, código, prédio) ignorando acentos; navegação por prédio e andar; grade ou lista; botão para copiar o código.
- Instalável (PWA) e com consulta offline: sem conexão, mostra os últimos dados salvos e avisa que podem estar desatualizados.
- A data "Base de salas atualizada em" vem do último commit real de `data/maptec.json` (API pública do GitHub).
- Visitantes podem usar **Sugerir correção** na sala, que abre uma issue do GitHub já preenchida.

## Como atualizar os dados

Edite `data/maptec.json` (direto pelo GitHub, botão ✏️) e faça o commit. O site atualiza em ~1 minuto.

```json
{
  "predios": [{
    "id": "adm",
    "nome": "Sede Administrativa",
    "nomeCurto": "Sede Administrativa",
    "subtitulo": "Edifício Luiz Rosalvo Indrusiak Fin",
    "endereco": { "logradouro": "Avenida Capitão Ene Garcez, 1696", "bairro": "São Francisco", "cidade": "Boa Vista – RR", "cep": "69305-135" },
    "foto": "assets/predios/sede.jpg",
    "divisoes": [{
      "nome": "Térreo",
      "unidades": [
        { "id": "01-secretaria-geral", "sala": "01", "nome": "SECRETARIA GERAL DA CORREGEDORIA", "codigo": "245", "obs": "" }
      ]
    }]
  }]
}
```

- `id` de cada unidade deve ser **único dentro do prédio** (só letras minúsculas, números e hífen) e não deve mudar, pois forma o link da sala.
- `sala` e `codigo` podem ser vazios; `obs` é uma observação opcional exibida na sala.
- Para novo prédio: adicione um item em `predios` e a foto em `assets/predios/`.
- Endereços e demais textos podem ser completados a qualquer momento.

## Publicação

GitHub Pages a partir da branch `main` (raiz). Basta fazer o commit.

Desenvolvido por [Rafajames](https://github.com/Rafajames).
