$(function (){
	function buildHTML(message){
		var image =`
					<li>
					    <p class="chat-body__user-name">
						  ${message.username}
					    </p>
					    <p class="chat-body__date">
						  ${message.created_at}
					    </p>
					    <p class="chat-body__text">
						  ${message.content}
					    </p>
					      <img src="${message.image.url}", class="chat-body__pic">
					</li>
				   `

		var html = `
				    <li>
						<p class="chat-body__user-name">
						  ${message.username}
					    </p>
					    <p class="chat-body__date">
						  ${message.created_at}
					    </p>
					    <p class="chat-body__text">
						  ${message.content}
					    </p>
					</li>
				   `
		if (message.image.url){
			return image;
		} else {
			return html;
		};
	}

	function scroll(){
	$('.chat-body').animate({scrollTop: $('.chat-content')[0].scrollHeight});
	}

	$(document).on('submit','#new_message', function(e){
		e.preventDefault();
		var formData = new FormData(this);
		var url = window.location.href;

		$.ajax({
			type       : 'POST',
			url        : url,
			data       : formData,
			dataType   : 'json',
			processData: false,
			contentType: false,
		})

		.done(function(data){
			var html = buildHTML(data);
			$('.chat-content').append(html);
			$('.submit').prop('disabled', false);
			document.getElementById('new_message').reset();
			scroll();
		})

		.fail(function(){
	        alert('error');
	        $('.submit').prop('disabled', false);
    	})
	});
});