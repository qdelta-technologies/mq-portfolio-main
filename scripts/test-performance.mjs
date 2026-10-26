import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('the hero preload exactly matches the rendered responsive image', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  const hero = await readFile(new URL('src/components/HeroSection.tsx', root), 'utf8');
  const manifest = JSON.parse(await readFile(new URL('src/data/imageAssets.json', root), 'utf8'));
  const preloadSizes = html.match(/imagesizes="([^"]+)"/)[1];
  const imageSizes = hero.match(/sizes="([^"]+)"/)[1];
  assert.equal(preloadSizes, imageSizes, 'Avoid downloading a larger or duplicate hero image.');
  assert.equal(html.match(/imagesrcset="([^"]+)"/)[1], manifest['/images/qais-portrait-hero.png'].srcSet);
});

test('every responsive image variant exists with its original declared size', async () => {
  const manifest = JSON.parse(await readFile(new URL('src/data/imageAssets.json', root), 'utf8'));
  await Promise.all(Object.values(manifest).flatMap(asset => asset.variants.map(async variant => {
    const file = await stat(new URL(`public${variant.src}`, root));
    assert.equal(file.size, variant.bytes, variant.src);
    assert.ok(variant.width > 0 && variant.height > 0);
    assert.ok(asset.srcSet.includes(`${variant.src} ${variant.width}w`));
  })));
});
