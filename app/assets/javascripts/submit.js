$(function (){

	function buildHTML(message){
		var image = `
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
	</li>`

		var html =`
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
		if (message.image.url) {
			console.log('wimage');
			return image;
		} else {
			console.log('woimage');
			return html;
		};
	}

	function scroll() {
	$('.chat-body').animate({scrollTop: $('.chat-content')[0].scrollHeight});
	}

	$(document).on('submit','#new_message', function(e){
		console.log('成功');
		e.preventDefault();
		var formData = new FormData(this);
		var url = window.location.href;
		$.ajax({
			type: 'POST',
		    url: url,
		    data: formData,
		    dataType: 'json',
		    processData: false,
      		contentType: false,
		})

		.done(function(data){
			console.log('seikou');
			var html = buildHTML(data);
			$('.chat-content').append(html);
			$('#message_content').val('');
			$('#message_image').val('');
			$('.submit').prop('disabled', false);
			scroll();
  		})

		.fail(function(){
	      alert('error');
	      $('.submit').prop('disabled', false);
    	})
	});
});