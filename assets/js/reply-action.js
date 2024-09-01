$(document).ready(function () {
  // reply button
  var commentID = 0;
  $(".post-comment-list").on("click", ".reply-btn", function () {
    var id = $(this).data("id");
    commentID = id;
    $(".reply-action-box").removeClass("d-none");
    $(".replyID-input").val(id);
    $(".comment-input").focus();
  });

  //  cancel reply button
  $(".cancel-reply-btn").click(function () {
    $(".reply-action-box").addClass("d-none");
    $(".replyID-input").val("");
  });


  // LIKE POST
  $(".like-post-btn").click(function () {
    postID = $(this).data("id");
    likeCount = parseInt(
      $('[data-id="' + postID + '"].like-post-count').text()
    );
    if ($(this).css("color") == "rgb(255, 0, 0)") {
      $(this).css("color", "rgb(33, 37, 41)");
      $('[data-id="' + postID + '"].like-post-count').text(likeCount - 1);
    } else {
      $(this).css("color", "red");
      $('[data-id="' + postID + '"].like-post-count').text(likeCount + 1);
    }
  });

  $(".modal-like-post-btn").click(function () {
    postID = $(this).data("postid");
    likeCount = parseInt(
      $('[data-postid="' + postID + '"].like-post-count').text()
    );
    if ($(this).css("color") == "rgb(255, 0, 0)") {
      $(this).css("color", "rgb(33, 37, 41)");
      $('[data-postid="' + postID + '"].like-post-count').text(likeCount - 1);
    } else {
      $(this).css("color", "red");
      $('[data-postid="' + postID + '"].like-post-count').text(likeCount + 1);
    }
  });

  // COPY LINK
  $(".copy-link-btn").on("click", function () {
    showSwal("copy-link");
    var $temp = $("<textarea>");
    var url = $(this).data("url");
    $("body").append($temp);
    $temp.val(url).select();
    document.execCommand("copy");
    $temp.remove();
  });


  // SEARCH
  $(".search-input").focus(function () {
      $(".clear-search-btn").removeClass('d-none');
    }).blur(function () {
     if($(this).val() == ""){
      $(".clear-search-btn,.search-result-box").addClass('d-none');
     }
    
    });
  $('.clear-search-btn').on('click',function(){
    $(".search-input").val('')
    $(".clear-search-btn,.search-result-box").addClass('d-none');
  })
  $('.search-input').on('input',function(){
  
    $('.loading-box').removeClass('d-none');
    $('.search-result-box').addClass('d-none')

    clearTimeout($.data(this, 'timer'));
    var wait = setTimeout(function(){
        $('.loading-box').addClass('d-none');
        if($(".search-input").val() != ""){
          $('.search-result-box').removeClass('d-none')
        }
      }, 1000);
    $(this).data('timer', wait);
  })


  // COMMENT POST
  $(".post-btn").click(function () {
    if ($(".comment-input").val().trim() !== "") {
      if (!$(".reply-action-box").hasClass("d-none")) {
        $(".reply-action-box").addClass("d-none");
        $('[data-id="' + commentID + '"].post-comment-user')
          .append(`  <div class="post-comment-user-reply ps-4">
                          <div class="d-flex py-2">
                            <img
                              class="border rounded-circle"
                              src="/assets/post/cast.jfif"
                              width="25"
                              height="25"
                            />
                            <p class="ms-2 mb-0 fw-bold">catzilla</p>
                            <span class="ps-2 text-muted"> 3h</span>
                          </div>
                          <div class="text-start">
                            <p>${$(".comment-input").val()}</p>
                          </div>
                        </div>`);
      } else {
        $(".post-comment-list").append(` <div class="post-comment-user">
            <div class="d-flex py-2">
              <img
                class="border rounded-circle"
                src="/assets/img/logo.png"
                width="25"
                height="25"
              />
              <p class="ms-2 mb-0 fw-bold">usernomad</p>
              <span class="ps-2 text-muted"> 3h</span>
            </div>
            <div class="text-start">
              <p class="m-0">${$(".comment-input").val()}</p>
            </div>
            <div class="p-0 text-start">
              <span class="fw-bold reply-btn" id="2" type="button">Reply</span>
            </div>
          </div>`);
      }
      $(".comment-input").val("");
    }
  });
});
