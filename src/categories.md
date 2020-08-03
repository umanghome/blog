---
layout: page
title:  Categories
---

<div class="tag-list">
{%- for cat in collections.categoriesAndPosts -%}
  <div class="tag-group">
    <h5 class="tag-group-title">{{ cat.category }}</h5>
    {%- for post in cat.posts -%}
      <article class="tag-item">
        <a class="tag-item-title" href="{{ site.url }}{{ post.url }}">{{post.data.title}}</a>
      </article>
    {%- endfor -%}
  </div>
{%- endfor -%}
</div>
