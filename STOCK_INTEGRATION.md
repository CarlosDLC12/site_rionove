# Integração de Estoque Real - Supabase

## Como Funciona

O site agora está preparado para usar dados reais de estoque do seu sistema de gestão Supabase.

### 1. Estrutura do Banco de Dados

Certifique-se de que sua tabela `inventory` no Supabase tem esta estrutura:

```sql
-- Tabela de inventário (já deve existir no seu sistema de gestão)
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Vincular Produtos

Para vincular os produtos do e-commerce com o inventário:

**Opção A: Usar o mesmo `product_id`**
- No sistema de gestão, use os mesmos IDs: '1', '2', '4'
- O e-commerce buscará automaticamente

**Opção B: Criar tabela de mapeamento**
```sql
CREATE TABLE product_mapping (
    ecommerce_id TEXT PRIMARY KEY,
    inventory_id UUID REFERENCES inventory(id)
);
```

### 3. Atualizar Home.tsx para Buscar Estoque Real

Substitua a função `fetchProducts` em `Home.tsx`:

```tsx
useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Buscar inventário do Supabase
            const { data: inventoryData, error } = await supabase
                .from('inventory')
                .select('product_id, quantity');

            if (!error && inventoryData) {
                // Mapear estoque para produtos
                const stockMap = inventoryData.reduce((acc, item) => {
                    acc[item.product_id] = item.quantity;
                    return acc;
                }, {} as Record<string, number>);

                // Adicionar estoque real aos produtos
                const productsWithStock = MOCK_PRODUCTS.map(product => ({
                    ...product,
                    stock: stockMap[product.id] || 0
                }));

                setProducts(productsWithStock);
            } else {
                setProducts(MOCK_PRODUCTS);
            }
        } catch (error) {
            console.error('Erro ao buscar estoque:', error);
            setProducts(MOCK_PRODUCTS);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
}, []);
```

### 4. Atualizar ProductDetails.tsx

Similarmente, atualizar a função `fetchProduct`:

```tsx
const fetchProduct = async () => {
    if (!id) return;

    try {
        // Buscar produto
        const mock = MOCK_PRODUCTS.find(p => p.id === id);
        
        if (mock) {
            // Buscar estoque real
            const { data: inventoryData } = await supabase
                .from('inventory')
                .select('quantity')
                .eq('product_id', id)
                .single();

            const productWithStock = {
                ...mock,
                stock: inventoryData?.quantity || 0
            };

            setProduct(productWithStock);
            setSelectedImage(mock.image_url);
            if (mock.variants && mock.variants.length > 0) {
                setSelectedColor(mock.variants[0].color);
            }
        }
    } catch (error) {
        console.error('Erro:', error);
    } finally {
        setLoading(false);
    }
};
```

### 5. Badges de Urgência Automáticos

Agora os badges mostram:
- ✅ **Estoque Real**: Se `product.stock <= 5`, mostra "Apenas X unidades restantes"
- ✅ **Atualização Automática**: Quando você atualizar o estoque no sistema de gestão, reflete no e-commerce
- ✅ **Fallback**: Se não houver conexão, usa valores simulados

### 6. Exemplo de Atualização de Estoque

No seu sistema de gestão, quando vender um produto:

```sql
UPDATE inventory 
SET quantity = quantity - 1,
    updated_at = NOW()
WHERE product_id = '1';
```

O e-commerce mostrará o estoque atualizado na próxima vez que a página carregar.

### 7. Políticas RLS (Row Level Security)

Certifique-se de que a tabela `inventory` permite leitura pública:

```sql
-- Permitir leitura pública do inventário
CREATE POLICY "Allow public read inventory"
ON inventory FOR SELECT
TO anon
USING (true);
```

### 8. Sincronização em Tempo Real (Opcional)

Para atualizar estoque em tempo real sem recarregar:

```tsx
useEffect(() => {
    const channel = supabase
        .channel('inventory-changes')
        .on('postgres_changes', 
            { event: 'UPDATE', schema: 'public', table: 'inventory' },
            (payload) => {
                // Atualizar produto quando estoque mudar
                setProducts(prev => prev.map(p => 
                    p.id === payload.new.product_id 
                        ? { ...p, stock: payload.new.quantity }
                        : p
                ));
            }
        )
        .subscribe();

    return () => {
        supabase.removeChannel(channel);
    };
}, []);
```

---

## Checklist de Implementação

- [ ] Verificar estrutura da tabela `inventory` no Supabase
- [ ] Garantir que `product_id` corresponde aos IDs do e-commerce
- [ ] Configurar políticas RLS para leitura pública
- [ ] Atualizar `Home.tsx` com código de busca de estoque
- [ ] Atualizar `ProductDetails.tsx` com código de busca de estoque
- [ ] Testar com dados reais
- [ ] (Opcional) Implementar sincronização em tempo real

---

## Benefícios

✅ **Estoque Sempre Atualizado**: Dados sincronizados com sistema de gestão  
✅ **Urgência Real**: Badges mostram estoque verdadeiro  
✅ **Menos Erros**: Evita vender produtos sem estoque  
✅ **Gestão Centralizada**: Um único lugar para gerenciar inventário
