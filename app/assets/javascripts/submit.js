$(function (){

	function builtHtml(message){
		var html =`%li
					  %p.chat-body__user-name= "${ current_user.name }"
					  %p.chat-body__date= "${ message.created_at.strftime("%Y/%m/%d %H:%M") }"
					  %p.chat-body__text= "${ message.content }"
					  = image_tag ${ message.image.url }, class: "chat-body__pic" if message.image.present?
				  `
		return html;
	}

	$('#new_message').on('submit', function(e){
			e.preventDefault();
		var formData = new FormData(this);
		var href = window.location.href;
		$.ajax({
			type: 'POST',
		    url: href,
		    data: formData,
		    dataType: 'json',
		    processData: false,
      		contentType: false
		})

		.done(function(data){
			var html = buildHTML(data);
			$('.chat_body').append(html);
  		})

		.fail(function(){
	      alert('error');
    	})
	});
});