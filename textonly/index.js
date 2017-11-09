var reg_killed      =  0;
var reg_resurrected =  0;
var reg_atrisk      =  0;
var reg_lowrisk     =  0;
var txt_killed      = "";
var txt_resurrected = "";
var txt_atrisk      = "";
var txt_lowrisk     = "";
var txt_safe        = "";
var text_var        = '<a href="https://lilpea.github.io/">← BACK TO MAIN SITE</a>\n\n<span class="dead title larger">DEAD GAMES:</span>\n=Az\n\n\n<span class="title resurrected"></span><span class="resurrected title larger">RESURRECTED GAMES:</span>\npL=\n\n\n<span class="risk title"></span><span class="risk title larger">GAMES AT RISK:</span>\n=_Z\n\n\n<span class="lowrisk title"></span><span class="lowrisk title larger">GAMES AT LOW RISK:</span>\n=Pz\n\n\n<span class="safe title"></span><span class="safe title larger">SAFE GAMES:</span>\n=_z';


function jsonParse(data) {
    for (var i = 0; i < data.feed.entry.length; i++) {
        var temp_template = "lP5mZANhAyHAfJr"
        var time_var = "";
        var orig_var = "";
        var link_var = "";
        for (var key in data.feed.entry[i]) {
                key_value = Object.keys(data.feed.entry[i][key]).map(function(e){return data.feed.entry[i][key][e]}).toString().replace("N/A", "").replace("No release date set", "");
                if (key.toString() === "gsx$game" && key_value !== "") {
                    temp_template = '<span class="title">' + key_value + '</span>\n' + temp_template;
                }
                if (key.toString() === "gsx$originalreleasedate" && key_value !== "") {
                    time_var = "  Created in " + key_value;
                    orig_var = "1";
                }
                if (key.toString() === "gsx$killedoffdate" && key_value !== "") {
                    if (orig_var !== "") {
                        time_var = time_var + ", ✝ " + key_value;
                    } else {
                        time_var = "  Created in ???, ✝ " + key_value;
                    }
                }
                if (key.toString() === "gsx$dateresurrected" && key_value !== "") {
                    time_var = time_var + " (Resurrection date: " + key_value + ")";
                }
                if (time_var !== "") {
                    temp_template = temp_template.replace("lP5", time_var + "\n"); 
                }
                if (key.toString() === "gsx$publisher" && key_value !== "") {
                    temp_template = temp_template.replace("mZA", "  Published by " + key_value + "\n"); 
                }
                if (key.toString() === "gsx$platforms" && key_value !== "") {
                    if (key_value.split(",").length === 1) {
                        temp_template = temp_template.replace("NhA", "  Platform: " + key_value + "\n");
                    } else {
                        temp_template = temp_template.replace("NhA", "  Platforms: " + key_value + "\n");
                    }
                }
                key_value = "  " + key_value + "\n";
                if (key.toString() === "gsx$notes" && key_value !== "  \n") {
                    temp_template = temp_template.replace("yHA", key_value); 
                }
                if (key.toString() === "gsx$homepage" && key_value !== "  \n") {
                    link_var = "Homepage: " + key_value;
                }
                if (key.toString() === "gsx$resurrectionandoradditionallinks" && key_value !== "") {
                    link_var = link_var + key_value;
                }
                if (link_var !== "") {
                        temp_template = temp_template.replace("fJr", "  " + link_var); 
                }
            }
        temp_template = temp_template + "\n\n"
        temp_template = temp_template.replace(/lP5|mZA|NhA|yHA|fJr/g, "")
        state = Object.keys(data.feed.entry[i].gsx$state).map(function(e){return data.feed.entry[i].gsx$state[e]}).toString()
        if (state === "Dead") {
            reg_killed++;
            txt_killed = txt_killed + temp_template;
        }
        if (state === "Resurrected") {
            reg_killed++;
            reg_resurrected++;
            txt_resurrected = txt_resurrected + temp_template;
        }
        if (state === "At risk") {
            reg_atrisk++;
            txt_atrisk = txt_atrisk + temp_template;
        }
        if (state === "Low risk") {
            reg_lowrisk++;
            txt_lowrisk = txt_lowrisk + temp_template;
        }
        if (state === "Safe") {
            txt_safe = txt_safe + temp_template;
        }
    };
    document.getElementsByTagName('pre') [0].innerHTML = text_var.replace("pL=", txt_resurrected).replace("=_Z", txt_atrisk).replace("=Pz", txt_lowrisk).replace("=Az", txt_killed).replace("=_z", txt_safe)
    document.getElementsByTagName('pre') [0].innerHTML = reg_killed + ' games have been killed, of which ' + reg_resurrected + ' have been resurrected\n' + reg_atrisk + ' games are at risk and ' + reg_lowrisk + ' games are at low risk\n\n\n' + document.getElementsByTagName('pre') [0].innerHTML;
        }
