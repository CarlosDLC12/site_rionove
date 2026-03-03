-- ============================================
-- COMANDOS PARA EXECUTAR NO SUPABASE SQL EDITOR
-- ============================================
-- Copie e cole estes comandos um por vez no SQL Editor
-- ============================================

-- PASSO 1: Ver os dados atuais do inventário
SELECT id, product_id, product_name, quantity 
FROM inventory 
ORDER BY product_name;

-- ============================================
-- PASSO 2: Atualizar os product_id
-- Execute estes 3 comandos UPDATE
-- ============================================

-- Atualizar Smartwatch Colmi P71 para product_id = '1'
UPDATE inventory 
SET product_id = '1'
WHERE product_name ILIKE '%colmi%' 
   OR product_name ILIKE '%p71%'
   OR product_name ILIKE '%smartwatch%colmi%';

-- Atualizar Fone Lenovo GM2 Pro para product_id = '2'
UPDATE inventory 
SET product_id = '2'
WHERE product_name ILIKE '%lenovo%' 
   OR product_name ILIKE '%gm2%'
   OR product_name ILIKE '%fone%lenovo%';

-- Atualizar Pulseiras 22mm para product_id = '4'
UPDATE inventory 
SET product_id = '4'
WHERE product_name ILIKE '%pulseira%' 
   OR product_name ILIKE '%22mm%'
   OR product_name ILIKE '%pulseira%smartwatch%';

-- ============================================
-- PASSO 3: Verificar as mudanças
-- ============================================
SELECT id, product_id, product_name, quantity 
FROM inventory 
ORDER BY product_id;

-- ============================================
-- RESULTADO ESPERADO:
-- product_id = '1' → Smartwatch Colmi P71
-- product_id = '2' → Fone Lenovo GM2 Pro
-- product_id = '4' → Pulseiras para Smartwatch 22mm
-- ============================================
