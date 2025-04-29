{% for item in module.left_content %}
	{{ item.module_type }}
	{% inline_text field="content_type" value="{{ item.content_type }}" %}
	{% inline_rich_text field="text" value="{{ item.text }}" %}
	{% if item.image.src %}
		{% set sizeAttrs = 'width="{{ item.image.width|escape_attr }}" height="{{ item.image.height|escape_attr }}"' %}
		{% if item.image.size_type == 'auto' %}
			{% set sizeAttrs = 'width="{{ item.image.width|escape_attr }}" height="{{ item.image.height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% elif item.image.size_type == 'auto_custom_max' %}
			{% set sizeAttrs = 'width="{{ item.image.max_width|escape_attr }}" height="{{ item.image.max_height|escape_attr }}" style="max-width: 100%; height: auto;"' %}
		{% endif %}
		 {% set loadingAttr = item.image.loading != 'disabled' ? 'loading="{{ item.image.loading|escape_attr }}"' : '' %}
		<img src="{{ item.image.src|escape_url }}" alt="{{ item.image.alt|escape_attr }}" {{ loadingAttr }} {{ sizeAttrs }}>
	{% endif %}
	{% if item.show_tag %}
		<!-- HTML to show when checked -->
	{% endif %}
	{% inline_text field="tag_text" value="{{ item.tag_text }}" %}
{% endfor %}