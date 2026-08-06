# O Fundamento do Nosso Amor

Experiência guiada em HTML, CSS e JavaScript puro.

## Funcionamento

- Não existe rolagem entre as telas.
- A pessoa avança somente ao clicar em **Continuar**.
- Há transições suaves entre as etapas.
- Existe botão para voltar.
- A música começa em volume baixo após o clique em **Começar**.
- O som pode ser pausado no botão superior direito.

## Música

Por questões de direitos autorais, o arquivo da música não está incluído.

Para usar uma gravação para a qual você tenha autorização/licença:

1. Renomeie o arquivo para:

```text
musica.mp3
```

2. Coloque dentro da pasta:

```text
assets
```

O endereço final deverá ficar assim:

```text
assets/musica.mp3
```

O volume inicial está configurado em `0.12`, ou seja, 12%.

Para alterar, abra `script.js` e procure:

```javascript
music.volume = 0.12;
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie `index.html`, `style.css`, `script.js` e a pasta `assets`.
3. Abra **Settings > Pages**.
4. Em **Source**, selecione **Deploy from a branch**.
5. Escolha `main` e `/root`.
6. Salve e aguarde a publicação.

## Atenção sobre o áudio

Navegadores de celular bloqueiam reprodução automática de áudio. Por isso a música começa somente após a pessoa tocar em **Começar**. Isso é uma regra do navegador e não um erro do site.
