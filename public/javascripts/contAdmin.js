function containerMaker(data, container) {

    var itemHtml = '';

    for (var i = 0; i < data.length; i++) {

     if (data[i].status == "pending") {
            if (data[i].status18plus == "yes") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();

                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message' >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }
            }

            if (data[i].status18plus == "no") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin'> " + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text'  onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message' >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox'  id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name' >" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox'  id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }

            }
        }


        if (data[i].status == "approved") {
            if (data[i].status18plus == "yes") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name' >" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }
            }
            if (data[i].status18plus == "no") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox'  id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";
                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text'  onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message' >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name' >" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }
            }
        }


        if (data[i].status == "declined") {
            if (data[i].status18plus == "yes") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";
                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name' >" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox' checked='checked' id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }
            }
            if (data[i].status18plus == "no") {
                if (data[i].name[0] == "@") {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin' >" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-tweet'  onclick='return twitterURL(this)'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox'  id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";
                } else {
                    $(container).find('> div').remove();
                    itemHtml += "<div class='item-admin'>" + "<div class='admin-note-inner'>" +
                    '<input type="checkbox"  id="' + data[i]._id + '" class="admin-note-checkbox">' +
                    "<div class='admin-note-inner-text' onclick='return selectCheckbox(this)'>" +
                    "<span class='admin-message'  >" + data[i].message + "</span>" + "</div>" +
                    "<p class='admin-name'>" +
                    data[i].name + "<p>" +
                    "<div class='admin-filter-hover'>" +
                    "<div class='item-admin-label'>" +
                    "<div class='admin-label-note-content'>" +
                    "<label class='admin-label' for='" + data[i]._id + "pending'>Pending</label>" +
                    "<input type='radio'   value='pending' id='" + data[i]._id + "pending'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)'  >" +

                    "<label class='admin-label'  for='" + data[i]._id + "approved'" + ">Approve</label>" +
                    "<input type='radio'   value='approved' id='" + data[i]._id + "approved'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' >" +

                    "<label class='admin-label'  for='" + data[i]._id + "declined'" + ">Decline</label>" +
                    "<input type='radio'   value='declined' id='" + data[i]._id + "declined'" +
                    "name='" + data[i]._id + "' class='radio' onchange='return changeStatusSelectItem(this)' checked>" +
                    "</div>" + "</div>" +
                    "<div class='admin-18plus-status' onclick='return divChange18plusStatus(this)'>18+" + "</div>" +
                    "<input type='checkbox'  id='" + data[i]._id + "'" +
                    "name='" + data[i].status18plus + "' class='admin-18checkbox' onchange='return change18plusStatus(this)'/>" +
                    "</div>" + "</div>" + "</div>" + "</div>";

                }
            }
        }


    }
return itemHtml;
}