$(document).ready(function() {
    /* $('.btn').on('click', function() {
        alert("test");
    }); */

    count_total();

    // 購物車調整數量
    $(document).on('change',"input[id^='buy']",function() {
        id = $(this).attr("data-id");
        price = $(this).attr("data-price");
        count = $(this).val();
        cal = Number(price) * Number(count);
        $("td[id^='total-price-"+id+"']").html('$'+cal);
        $("div[id^='count_price-"+id+"']").html(cal); //總計用隱藏欄位
        /* console.log(cal);
        return false; */

        count_total();
    });

    // 加入購物車按鈕
    $('img#addtocart').on('click', function() {
        id = $(this).attr("data-id");
        product_name = $(this).attr("data-name");
        product_price = $(this).attr("data-price");
        // console.log(product_price);

        add_cart(id,product_name,product_price);
    });
    
    // 購物車刪除按鈕
    $(document).on('click',"a[id^='delcart']",function() {
        id = $(this).attr("data-id");
        // Swal.fire(id);

        Swal.fire({
            title: '確定要刪除此商品？',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '刪除',
            cancelButtonText: "取消",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '已刪除!',
                '此商品已從購物車移除',
                'success'
              )
              $('table tr#cartlist-'+id+'').remove();
              count_total();
            }
          })

        count_total();
    });

    //清空購物車按鈕
    $('button#empty_cart').on('click', function() {
        id = $(this).attr("data-id");
        Swal.fire({
            title: '確定要清空購物車？',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '刪除',
            cancelButtonText: "取消",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '已刪除!',
                '購物車已清空',
                'success'
              )
              $('#tbody').empty();
              count_total();
            }
          })
    });
});

// 購物車總計計算
function count_total () {
    var sum = 0;
    $("div[id^='count_price']").each(function() {
        // console.log($(this).text());
        sum += Number($(this).text());
        // console.log(sum);
    });

    $("strong#final_total").html('$'+sum);
}

function add_cart (id,name,price) {
    td1 = '<td class="product-thumbnail"><img src="img/products/products0'+id+'.jpeg" alt="Image" class="img-fluid"></td>';
    td2 = '<td class="product-name"><h2 class="h5 text-black">'+name+'</h2></td>';
    td3 = '<td>'+price+'</td>';
    td4 = 
    '<td>'+
        '<div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">'+
            '<div class="input-group-prepend visually-hidden">'+
            '<button class="btn btn-outline-black decrease" type="button">&minus;</button>'+
            '</div>'+
            '<input type="number" class="form-control text-center quantity-amount" style="width: 300px;" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" min="0" id="buy-'+id+'" data-price="'+price+'" data-id="'+id+'">'+
            '<div id="count_price-'+id+'" class="visually-hidden">'+price+'</div> <!-- 隱藏欄位計算用  -->'+
            '<div class="input-group-append visually-hidden">'+
                '<button class="btn btn-outline-black increase" type="button">&plus;</button>'+
            '</div>'+
        '</div>'+
    '</td>';
    td5 = '<td id="total-price-'+id+'">$'+price+'</td>';
    td6 = '<td><a href="javascript:void(0)" class="btn btn-black btn-sm" id="delcart" data-id="'+id+'">X</a></td>';
    tr = '<tr id="cartlist-'+id+'">'+td1+td2+td3+td4+td5+td6+'</tr>';
    $("#tbody").append(tr);
    /* console.log(id);
    console.log(name);
    console.log(price); */
    count_total();
}
