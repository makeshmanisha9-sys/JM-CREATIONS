file_path = r'C:\Users\manishasubathra\.gemini\antigravity\scratch\jm-creations\components\home\ClientWorldScene.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Image import
if "import Image from 'next/image';" not in text:
    text = text.replace("import NextLink from 'next/link';", "import NextLink from 'next/link';\nimport Image from 'next/image';")

# 2. Update Ticker 1 logo icon
ticker1_old = """                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-gold-500/50 flex items-center justify-center text-gold-500 font-display font-bold text-xs">
                  {client.name.slice(0, 2).toUpperCase()}
                </div>"""

ticker1_new = """                <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-gold-500/50 flex items-center justify-center text-gold-500 font-display font-bold text-xs relative shrink-0">
                  {client.logo_url ? (
                    <Image src={client.logo_url} alt={client.name} fill sizes="32px" className="object-cover" />
                  ) : (
                    client.name.slice(0, 2).toUpperCase()
                  )}
                </div>"""

# 3. Update Directory Grid logo icon
grid_old = """                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 font-display font-bold text-sm mb-4">
                    {client.name.slice(0, 2).toUpperCase()}
                  </div>"""

grid_new = """                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 font-display font-bold text-sm mb-4 relative shrink-0">
                    {client.logo_url ? (
                      <Image src={client.logo_url} alt={client.name} fill sizes="40px" className="object-cover" />
                    ) : (
                      client.name.slice(0, 2).toUpperCase()
                    )}
                  </div>"""

norm_text = text.replace('\r\n', '\n')
norm_t1_old = ticker1_old.replace('\r\n', '\n')
norm_t1_new = ticker1_new.replace('\r\n', '\n')
norm_grid_old = grid_old.replace('\r\n', '\n')
norm_grid_new = grid_new.replace('\r\n', '\n')

norm_text = norm_text.replace(norm_t1_old, norm_t1_new)
norm_text = norm_text.replace(norm_grid_old, norm_grid_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(norm_text)
print("Updated ClientWorldScene.tsx with client images!")
