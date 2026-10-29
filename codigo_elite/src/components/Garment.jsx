import { categoryById, colors } from '../data'
import { publicUrl } from '../utils'

// Siluetas (frente y espalda) que se dibujan mientras una prenda no tenga foto propia
const shapes = {
  tee: {
    front: {
      body: 'M80 40 L50 54 L18 98 L48 116 L66 94 L66 208 L174 208 L174 94 L192 116 L222 98 L190 54 L160 40 Q120 76 80 40 Z',
      lines: ['M80 40 Q120 84 160 40', 'M66 196 L174 196', 'M26 100 L52 117', 'M214 100 L188 117'],
    },
    back: {
      body: 'M80 40 L50 54 L18 98 L48 116 L66 94 L66 208 L174 208 L174 94 L192 116 L222 98 L190 54 L160 40 Q120 50 80 40 Z',
      lines: ['M82 44 Q120 56 158 44', 'M112 54 L128 54 L128 64 L112 64 Z', 'M66 196 L174 196', 'M26 100 L52 117', 'M214 100 L188 117'],
    },
  },
  hoodie: {
    front: {
      body: 'M84 48 L46 64 L26 172 L56 180 L68 124 L68 210 L172 210 L172 124 L184 180 L214 172 L194 64 L156 48 Q120 84 84 48 Z',
      extra: 'M84 48 Q82 14 120 12 Q158 14 156 48 Q120 86 84 48 Z',
      lines: ['M98 46 Q120 76 142 46', 'M86 160 L154 160 L164 192 L76 192 Z', 'M113 76 L111 110', 'M127 76 L129 110', 'M68 198 L172 198'],
    },
    back: {
      body: 'M84 48 L46 64 L26 172 L56 180 L68 124 L68 210 L172 210 L172 124 L184 180 L214 172 L194 64 L156 48 Q120 60 84 48 Z',
      extra: 'M82 46 Q90 20 120 20 Q150 20 158 46 Q166 92 120 106 Q74 92 82 46 Z',
      lines: ['M120 22 L120 105', 'M120 106 L120 210', 'M68 198 L172 198', 'M30 160 L58 168', 'M210 160 L182 168'],
    },
  },
  pants: {
    front: {
      body: 'M72 28 L168 28 L180 216 L128 216 L120 92 L112 216 L60 216 Z',
      lines: ['M72 44 L168 44', 'M120 44 L120 92', 'M78 52 Q86 76 100 82', 'M162 52 Q154 76 140 82'],
    },
    back: {
      body: 'M72 28 L168 28 L180 216 L128 216 L120 92 L112 216 L60 216 Z',
      lines: ['M72 44 L168 44', 'M120 44 L120 92', 'M82 60 L108 60 L106 84 Q95 90 84 84 Z', 'M132 60 L158 60 L156 84 Q145 90 134 84 Z'],
    },
  },
  shorts: {
    front: {
      body: 'M66 50 L174 50 L190 156 L128 156 L120 108 L112 156 L50 156 Z',
      lines: ['M66 66 L174 66', 'M120 66 L120 108', 'M54 144 L113 144', 'M127 144 L186 144'],
    },
    back: {
      body: 'M66 50 L174 50 L190 156 L128 156 L120 108 L112 156 L50 156 Z',
      lines: ['M66 66 L174 66', 'M120 66 L120 108', 'M76 76 L104 76 L102 98 Q90 104 78 98 Z', 'M136 76 L164 76 L162 98 Q150 104 138 98 Z', 'M54 144 L113 144', 'M127 144 L186 144'],
    },
  },
  jacket: {
    front: {
      body: 'M80 46 L44 62 L24 176 L54 184 L66 126 L66 212 L174 212 L174 126 L186 184 L216 176 L196 62 L160 46 L120 70 Z',
      extra: 'M80 46 Q100 28 120 34 Q140 28 160 46 L120 78 Z',
      lines: ['M120 78 L120 212', 'M66 198 L174 198', 'M84 150 L104 150', 'M156 150 L136 150', 'M28 168 L58 176', 'M212 168 L182 176'],
    },
    back: {
      body: 'M80 46 L44 62 L24 176 L54 184 L66 126 L66 212 L174 212 L174 126 L186 184 L216 176 L196 62 L160 46 Q120 58 80 46 Z',
      extra: 'M80 46 Q100 30 120 32 Q140 30 160 46 L160 54 Q120 66 80 54 Z',
      lines: ['M120 62 L120 212', 'M70 92 Q120 106 170 92', 'M66 198 L174 198', 'M28 168 L58 176', 'M212 168 L182 176'],
    },
  },
  cap: {
    front: {
      body: 'M40 160 Q36 78 112 68 Q186 72 192 150 L192 162 L40 162 Z',
      extra: 'M178 148 Q230 146 240 170 Q198 164 180 170 Z',
      lines: ['M106 68 a6 4 0 1 0 12 0 a6 4 0 1 0 -12 0', 'M112 68 Q84 110 82 162', 'M112 68 Q148 108 152 162', 'M40 150 L192 150'],
    },
    back: {
      body: 'M62 150 Q60 70 120 64 Q180 70 178 150 Z',
      extra: 'M60 150 L180 150 L178 172 L62 172 Z',
      lines: ['M114 64 a6 4 0 1 0 12 0 a6 4 0 1 0 -12 0', 'M120 68 L120 150', 'M92 68 Q86 110 84 150', 'M148 68 Q154 110 156 150', 'M106 156 L134 156 L134 168 L106 168 Z'],
    },
  },
}

// Accesorios: bolso/canguro, perfume y reloj
Object.assign(shapes, {
  bag: {
    front: {
      body: 'M44 104 Q44 88 60 88 L180 88 Q196 88 196 104 L196 184 Q196 200 180 200 L60 200 Q44 200 44 184 Z',
      extra: 'M62 92 Q62 34 120 34 Q178 34 178 92 L166 92 Q166 46 120 46 Q74 46 74 92 Z',
      lines: ['M44 124 L196 124', 'M108 124 L108 140 L132 140 L132 124', 'M60 184 L180 184'],
    },
  },
  perfume: {
    front: {
      body: 'M70 96 Q70 84 82 84 L158 84 Q170 84 170 96 L170 206 Q170 218 158 218 L82 218 Q70 218 70 206 Z',
      extra: 'M98 44 L142 44 L142 70 L150 70 L150 84 L90 84 L90 70 L98 70 Z',
      lines: ['M88 140 L152 140', 'M88 170 L152 170', 'M98 70 L142 70'],
    },
  },
  watch: {
    front: {
      body: 'M96 20 L144 20 L150 72 L150 168 L144 220 L96 220 L90 168 L90 72 Z',
      extra: 'M120 62 a58 58 0 1 0 0.1 0 Z',
      lines: ['M120 82 a38 38 0 1 0 0.1 0', 'M120 92 L120 120 L140 132', 'M178 112 L188 112 L188 128 L178 128'],
    },
  },
})

function isLight(hex) {
  const n = parseInt(hex.slice(1), 16)
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) > 150
}

export function Garment({ type, hex, view = 'front' }) {
  const set = shapes[type] || shapes.tee
  const s = set[view] || set.front
  const seam = isLight(hex) ? 'rgba(0,0,0,.22)' : 'rgba(255,255,255,.2)'
  const edge = 'rgba(0,0,0,.3)'
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <path d={s.body} fill={hex} stroke={edge} strokeWidth="1.5" strokeLinejoin="round" />
      {s.extra && <path d={s.extra} fill={hex} stroke={edge} strokeWidth="1.5" strokeLinejoin="round" />}
      {s.lines.map((d) => (
        <path key={d} d={d} fill="none" stroke={seam} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

// Foto de la prenda si existe; si no, su silueta en el color elegido. view: 'front' | 'back'
export function Picture({ product, color, view = 'front' }) {
  const byColor = product.imagesByColor?.[color || product.colors[0]]
  if (product.image || byColor) {
    const src = view === 'back' && product.imageBack ? product.imageBack : byColor || product.image
    return <img src={publicUrl(src)} alt={product.name} loading="lazy" />
  }
  const type = product.type || categoryById[product.category]?.type
  return <Garment type={type} hex={colors[color || product.colors[0]].hex} view={view} />
}
