"use strict";


$(document).ready( () => {

    const emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ ;
    const positiveNum = /^([0-9]*|\d*\.\d{1}?\d*)$/;
    const  calculateDiscount = input  =>  {
        let  discount =  1;
        let type = $("#discountType").val();
        switch (type)
        {
            case ("0"):
                break;
            case ("1"):
                discount = .9;
                break;
            case ("2"):
                discount = .9;
                break;
            case ("3"):
                discount = .85;
                break;
            default:
                break;
        }

        return (input > 0 ? input * discount : input);
    };

    const  checkIfExists = input  =>  {
        let exists = true;
        if(input.trim() == "")
        {
            exists = false;
        }

        return exists;
    };

    $( function() {
        $( "#purchaseDate" ).datepicker({ minDate:-20, maxDate: 0, showOtherMonths: true, selectOtherMonths: true });
    });

    $("#buttonSubmit").click( evt => {

        let isValid = true;

        const email = $("#inputEmail").val().trim();
        if(!checkIfExists(email))
        {
            $("#inputEmail").next().text("This field is required");
            isValid = false;
        }
        else if(!emailPattern.test(email))
        {
            $("#inputEmail").next().text("Must be a valid email address");
            isValid = false;
        }
        else
        {
            $("#inputEmail").next().text("");
        }

        const amount = $("#purchaseAmount").val().trim();
        if(!positiveNum.test(amount))
        {
            $("#purchaseAmount").next().text("Must be a valid number");
            isValid = false;
        }
        else if (!checkIfExists(amount))
        {
            $("#purchaseAmount").next().text("*");
            isValid = false;
        }
        else
        {
            $("#purchaseAmount").next().text("");
        }

        let date = $("#purchaseDate").val();
        if(!checkIfExists(date))
        {
            $("#purchaseDate").next().text("*");
            isValid = false;
        }
        else
        {
            $("#purchaseDate").next().text("");
        }
        
        if(!isValid)
        {
            $("#discountedPrice").val("");
            return;
        }
        else
        {
            $("#discountedPrice").val(calculateDiscount($("#purchaseAmount").val()));
        }
        evt.preventDefault();
    });

    $("#discountType")
    .change(function () { 
        try
        {
            var str = calculateDiscount($("#purchaseAmount").val());
            $("#discountedPrice").val(str);
        }
        catch{}
    })
    .change();

    $("input[type='text']").on("click", function () {
        $(this).select();
     });

    $("#inputEmail").blur( evt => {
        const email = $("#inputEmail").val().trim();
        if(!checkIfExists(email))
        {
            $("#inputEmail").next().text("*");
        }
        else if(!emailPattern.test(email))
        {
            $("#inputEmail").next().text("Must be a valid email address");
        }
        else
        {
            $("#inputEmail").next().text("");
        }
    });

    $("#purchaseAmount").blur( evt => {
        const amount = $("#purchaseAmount").val().trim();
        let isValid = true;
        if(!positiveNum.test(amount))
        {
            $("#purchaseAmount").next().text("Must be a valid number");
            isValid = false;
        }
        else if (!checkIfExists(amount))
        {
            $("#purchaseAmount").next().text("*");
            isValid = false;
        }
        else
        {
            $("#purchaseAmount").next().text("");
        }
    });

    $("#purchaseDate").blur( evt => {
        let date = $("#purchaseDate").val();
        let isValid = true;
        if(!checkIfExists(date))
        {
            $("#purchaseDate").next().text("*");
            isValid = false;
        }
        else
        {
            $("#purchaseDate").next().text("");
        }
    });
});