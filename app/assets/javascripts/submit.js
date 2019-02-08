$(function (){
	function buildHtml(message){
		var image =`
					<li class="messages" data-id=${message.id}>
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
				    <li class="messages" data-id=${message.id}>
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

	function update(){
		if($('.messages')[0]){
			var message_id = $('.messages:last').data('id');
		} else {
			var message_id = 0
		}

		$.ajax({
			method :'GET',
			url :window.location.href,
			data :{
				message: { id: message_id }
			},
			dataType: 'json'
		})

		.done(function(data){
			$.each(data, function(i, data){
				var html = buildHtml(data);
				$('.chat-content').append(html);
				scroll();
			});
		})

		.fail(function() {
			alert('エラーです');
		});
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
			var html = buildHtml(data);
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

	if (document.location.href.match(/\/groups\/\d+\/messages/)) {
		$(function() {
			setInterval(update, 5000);
		});
	}
});

















