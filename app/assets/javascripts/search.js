$(function() {
	var preWord;
	function searchUsersHtml(user) {
		var html = `
					<div class="chat-group-user clearfix">
			  		<p class="chat-group-user__name">${user.name}</p>
			  		<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.name}<">追加</a>
					</div>
				   `
		$('#user-search-result').append(html);
	}

	function createNoHtml(user) {
		var html = `
					<div class="chat-group-user clearfix">
			  		<p class="chat-group-user__name">${user}</p>
					</div>
				   `
		$('#user-search-result').append(html);
	}

	function addChatUser(user) {
		var html =`
					<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
					  <input name='group[user_ids][]' type='hidden' value='${user.user_id}'>
					  <p class='chat-group-user__name'>${user.name}</p>
					  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
					</div>
				  `
		$('#chat-group-users').append(html);
	}

	$(document).on('input', '#user-search-field',  function() {
		$("#user-search-result").empty();
		var input = $('#user-search-field').val();
		$.ajax({
					type    : 'GET',
					url     : '/users',
					data    : { keyword: input },
					dataType: 'json'
			  })

		.done(function (users) {
			if (input != preWord && input.length !== 0) {
				users.forEach(function(user){
					searchUsersHtml(user);
				});
			}
			if (users.length === 0) {
				createNoHtml("一致するユーザーはいませんでした");
			}
			preWord = input;
		})
		.fail(function() {
	      	alert("ユーザー検索に失敗しました");
	    });
	});

	$(document).on('click', '.chat-group-user__btn--add', function() {
		$.ajax({
			type    : 'GET',
			url     : '/users',
			data    : { keyword: $(this).siblings().text() },
			dataType: 'json'
		})

		.done(function (userData) {
			var user = userData[0];
			addChatUser(user);
		})

		.fail(function() {
			alert("失敗しました");
		});

		$(this).parent().remove();
	});

	$(document).on('click', '.chat-group-user__btn--remove', function() {
		$(this).parent().remove();
	});
});