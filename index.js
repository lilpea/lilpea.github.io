var reg_killed      = 0;
var reg_resurrected = 0;
var reg_atrisk      = 0;
var reg_lowrisk     = 0;

function jsonParse(data) {
    for (var i = 0; i < data.feed.entry.length; i++) {
        var temp_template = "lP5mZANhAyHAfJr"
        var time_var = "";
        var orig_var = "";
        var link_var = "";
        for (var key in data.feed.entry[i]) {
            if (data.feed.entry[i].hasOwnProperty(key)) {
                key_value = Object.values(data.feed.entry[i][key]).toString().replace("N/A", "").replace("No release date set", "");
                li_value = key_value + "</li>";
                if (key.toString() === "gsx$game" && key_value !== "") {
                    temp_template = '<div class="justforthepointer"><div class="game" tabindex="2"><h3>' + key_value + '</h3><ul><div class="fucss">' + temp_template;
                }
                if (key.toString() === "gsx$originalreleasedate" && key_value !== "") {
                    time_var = "<li>Created in " + key_value;
                    orig_var = "1";
                }
                if (key.toString() === "gsx$killedoffdate" && key_value !== "") {
                    if (orig_var !== "") {
                        time_var = time_var + ", ✝ " + key_value;
                    } else {
                        time_var = "<li>Created in ???, ✝ " + key_value;
                    }
                }
                if (key.toString() === "gsx$dateresurrected" && key_value !== "") {
                    time_var = time_var + " (Resurrection date: " + key_value + ")";
                }
                if (time_var !== "") {
                    time_var = time_var + "</li>";
                    temp_template = temp_template.replace("lP5", time_var); 
                }
                if (key.toString() === "gsx$publisher" && key_value !== "") {
                    temp_template = temp_template.replace("mZA", "<li>Published by " + li_value); 
                }
                if (key.toString() === "gsx$platforms" && key_value !== "") {
                    if (key_value.split(",").length === 1) {
                        temp_template = temp_template.replace("NhA", "<li>Platform: " + li_value);
                    } else {
                        temp_template = temp_template.replace("NhA", "<li>Platforms: " + li_value);
                    }
                }
                if (key.toString() === "gsx$notes" && key_value !== "") {
                    temp_template = temp_template.replace("yHA", '<li class="nts"> ' + li_value + ' '); 
                }
                if (key.toString() === "gsx$homepage" && key_value !== "") {
                    link_var = "Homepage: <br>" + key_value + " <br>";
                }
                if (key.toString() === "gsx$resurrectionandoradditionallinks" && key_value !== "") {
                    link_var = link_var + key_value
                }
                if (link_var !== "") {
                    temp_template = temp_template.replace("fJr", '<li class="links"> ' + link_var.replace(" ", " <br> ") + " "); 
                }
                temp_template = temp_template + "</div></ul></div></div>"
            }
            }
        temp_template = temp_template.replace(/lP5|mZA|NhA|yHA|fJr/g, "").replace(/(https?:\/\/.+?)\s/g, '<a href="$1">$1</a>');
        state = Object.values(data.feed.entry[i].gsx$state).toString();
        if (state === "Dead") {
            reg_killed++;
            document.getElementsByClassName('dead') [0].innerHTML = document.getElementsByClassName('dead') [0].innerHTML += temp_template;
        }
        if (state === "Resurrected") {
            reg_killed++;
            reg_resurrected++;
            document.getElementsByClassName('rsrctd') [0].innerHTML = document.getElementsByClassName('rsrctd') [0].innerHTML += temp_template;
        }
        if (state === "At risk") {
            reg_atrisk++;
            document.getElementsByClassName('risk') [0].innerHTML = document.getElementsByClassName('risk') [0].innerHTML += temp_template;
        }
        if (state === "Low risk") {
            reg_lowrisk++;
            document.getElementsByClassName('lowrisk') [0].innerHTML = document.getElementsByClassName('lowrisk') [0].innerHTML += temp_template;
        }
        if (state === "Safe") {
            document.getElementsByClassName('safe') [0].innerHTML = document.getElementsByClassName('safe') [0].innerHTML += temp_template;
        }
        document.getElementsByClassName('thenumbers') [0].innerHTML = '<span class="topbunk"><b>' + reg_killed + '</b> games have been killed, of which <b>' + reg_resurrected + '</b> have been resurrected</span><div class="bottombunk"><span class="left"><b>' + reg_atrisk + '</b> games are at risk</span> <span class="right"><b>' + reg_lowrisk + '</b> games are at low risk</span></div>';
        document.documentElement.innerHTML = document.documentElement.innerHTML.replace(' loading">', '">');
        }
    };
