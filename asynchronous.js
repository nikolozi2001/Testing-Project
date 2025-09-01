let region = row["page1Table2AreaIDa"];
let municipal = row["page1Table2AreaIDb"].value;

if (municipal) {
    if (!region) {
        return true;
    }

    jQuery.ajax({
        url: "http://192.168.1.244:81/api/lib/regions-by-parent?parentId=" + region.value,
        success: function(result) {
            values = result;
        },
        async: false
    });

    let set = [];
    for (let i = 0; i < values.length; i++) {
        set.push(values[i].value);
    }

    if (!set.includes(municipal.value)) {
        return true;
    } else {
        return false;
    }
}
