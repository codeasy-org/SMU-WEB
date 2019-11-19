var _bsap = {
  apiurl: '\/\/s3.buysellads.com\/r\/',
  dz: [],
  dii: [],
  inv: [],
  oshow: window['__bsap__onlyshow_spotid'],
  drop: function (a, b) {
    this.dii[b] = this.dii[b] || 0;
    var l = 'bsap_' + b + (++this.dii[b] === 1 ? '' : '_' + this.dii[b]);
    document.write('<div id="' + l + '" class="bsap_' + b + ' bsap"><\/div>');
    this.idrop(l, a, b)
  },
  idrop: function (i, a, b) {
    this.dz[b] = this.dz[b] || [];
    this.dz[b].push(i);
    if (!document.getElementById('_bsap_js_' + a)) {
      var c = document.createElement('script'), d = new Date();
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      c.type = 'text\/javascript';
      c.id = '_bsap_js_' + a;
      c.src = this.apiurl + 's_' + a + '.js?v=' + d.getTime();
      c.setAttribute('async', 'async');
      document.getElementsByTagName('head')[0].appendChild(c)
    } else if (this.jz) this.deploy()
  },
  prem: {},
  exec: function () {
    this.prem = {};
    this.callback = typeof (BSACallback) === 'function' ? BSACallback : function () {
    };
    for (var cl = function (cl) {
      for (var n = !!document.getElementsByClassName, ret = [], els = n ? document.getElementsByClassName(cl) : document.getElementsByTagName('*'), p = n ? false : new RegExp('(^|\\s)' + cl + '(\\s|$)'), i = 0; i < els.length; i++) if (!p || p.test(els[i].className)) ret.push(els[i]);
      return ret
    }, bs = cl('bsarocks'), id, pk, p = /bsap_([a-f0-9]+)/i, i = 0; i < bs.length && (id = bs[i].getAttribute('id')) && (rid = id.split('_')[1]) && (pk = bs[i].getAttribute('rel') || ((pk = p.exec(bs[i].className)) ? pk[1] : '')) && (bs[i].className = 'bsap_' + rid + ' bsap'); i++) this.idrop(id, pk, rid)
  },
  reload: function () {
    this.exec()
  },
  deploy: function () {
    for (var zi = 0, wi, z, a, b, db; zi < this.jz.length && (z = this.jz[zi]) && (wi = 1); zi++) while (++wi < 10 && (db = this.dz[z.id]) && (a = db.pop()) && (b = document.getElementById(a))) (this.inv[z.id] = function () {
      new _bsap.zone(b, z, _bsap);
      return false
    })()
  },
  writescript: null,
  scripts: 0,
  writes: {},
  scriptqueue: [],
  zone: function (b, z, bsa) {
    function doc_write(write) {
      if (!bsa.writes[bsa.writescript.id]) bsa.writes[bsa.writescript.id] = '';
      bsa.writes[bsa.writescript.id] += write
    }

    function flushWrite(which) {
      if (bsa.writes[which]) {
        var el = document.getElementById(which), writer = el.parentNode.insertBefore(document.createElement('div'), el);
        writer.id = 'write_' + el.id;
        writer.className = 'document_write';
        setInnerHtmlAndExec(writer, bsa.writes[which]);
        delete bsa.writes[which]
      }
    }

    function stepQueue(which) {
      if (bsa.scriptqueue.length > 0 && bsa.scriptqueue[0].which == which && !bsa.scriptqueue[0].run) bsa.scriptqueue.shift();
      runQueue()
    }

    function runQueue() {
      if (bsa.scriptqueue.length > 0 && bsa.scriptqueue[0].run) {
        var func = bsa.scriptqueue[0].run;
        bsa.scriptqueue[0].run = null;
        func()
      }
    }

    function scriptLoaded(id) {
      flushWrite(id);
      stepQueue(id)
    }

    var setwrite = false;

    function gotScript(sc) {
      if (!setwrite) {
        document.write = function (x) {
          doc_write(x)
        };
        document.writeln = function (x) {
          doc_write(x + '\n')
        };
        setwrite = true
      }
      bsa.scripts++;
      var id = 'auto_' + bsa.scripts;
      bsa.scriptqueue.push({
        which: id, run: (function (id, sc) {
          return function () {
            var data = sc.text || sc.textContent || sc.innerHTML;
            bsa.writescript = sc.parentNode.insertBefore(document.createElement('script'), sc);
            bsa.writescript.type = 'text/javascript';
            bsa.writescript.async = false;
            bsa.writescript.id = id;
            bsa.writescript.className = 'ignoreme';
            var myload = function () {
              scriptLoaded(id)
            };
            bsa.writescript.onload = function () {
              myload()
            };
            bsa.writescript.onreadystatechange = function () {
              if (this.readyState == 'loaded' || this.readyState == 'complete') myload()
            };
            if (sc.src) bsa.writescript.src = sc.src; else {
              try {
                bsa.writescript.appendChild(document.createTextNode(data))
              } catch (e) {
                bsa.writescript.text = data
              }
              myload()
            }
            sc.parentNode.removeChild(sc)
          }
        })(id, sc)
      });
      if (bsa.scriptqueue.length == 1) runQueue()
    }

    function findScripts(t) {
      for (var i = 0; i < t.childNodes.length; i++) t.childNodes[i].nodeName.toLowerCase() == 'script' && t.childNodes[i].className != 'ignoreme' ? gotScript(t.childNodes[i]) : findScripts(t.childNodes[i])
    }

    function setInnerHtmlAndExec(el, html) {
      el.innerHTML = '<br/>' + html;
      el.removeChild(el.firstChild);
      findScripts(el)
    }

    bsa.filter(z.filterby, function (f) {
      var zf = [], zs = z.filters, i, j;
      for (i = 0; zs && i < f.length; i++) zf = zf.concat(typeof zs[f[i].toLowerCase()] == 'object' ? zs[f[i].toLowerCase()].ads : []);
      zf = !zf.length ? (zs.all || z) : {ads: zf};
      var empty = 0, exec = [], c = (!zf || !zf.ads || !zf.ads.length) ? [] : bsa.getads(zf, z.nads), d, e = c[0],
      t = '', o = '', fr, a, backfilled = false, tf = z.format ? z.format : (z.type && z.type == 1 ? 2 : 0),
      ts = Math.round(+new Date() / 1000), w = z.width, h = z.height, css = function (x) {
        var newel = document.createElement('style.scss');
        newel.type = 'text\/css';
        newel.id = 'bsa_css';
        var ie6 = newel.styleSheet ? typeof (newel.styleSheet.cssText) == 'unknown' : false,
        el = !ie6 ? document.getElementById('bsa_css') || newel : newel;
        el.styleSheet ? (ie6 ? el.styleSheet.cssText = x : el.styleSheet.cssText += x) : el.appendChild(document.createTextNode(x));
        document.getElementsByTagName('head')[0].appendChild(el)
      };
      if (z.premium) {
        if (!bsa.prem[z.premium]) bsa.prem[z.premium] = 1;
        var srv = z.premium + (bsa.prem[z.premium] > 1 ? '_' + bsa.prem[z.premium] : '');
        if (!bsa.prem[b.id]) {
          bsa.prem[b.id] = true;
          bsa.prem[z.premium]++;
          b.className = 'bsaPROrocks bsap_' + z.id;
          b.setAttribute('data-serve', srv)
        }
        if (!document.getElementById('_bsap_premium_pro')) {
          var pc = document.createElement('script');
          pc.type = 'text\/javascript';
          pc.src = '\/\/s3.buysellads.com\/ac\/pro.js';
          pc.id = '_bsap_premium_pro';
          pc.onload = function () {
            _bsaPRO()
          };
          document.getElementsByTagName('head')[0].appendChild(pc)
        } else if (typeof (_bsaPRO_loaded) !== 'undefined') {
          b.innerHTML = '';
          _bsaPRO_loaded = false;
          delete window['bsa_' + srv];
          _bsaPRO()
        }
        return
      }
      if (zf && zf.ads) for (empty = 100, i = 0; i < zf.ads.length; i++) empty -= zf.ads[i].per / (z.model == 1 ? z.nads : 1);
      if ((z.noempties && z.noempties == 1) || bsa.oshow) empty = 0;
      if (t <= 1) {
        var ah = (typeof (ShowAdHereBanner) === 'object' ? ShowAdHereBanner[z.id] : z.showadhere) > 0,
        ra = (typeof (RepeatAll) === 'object' ? RepeatAll[z.id] : z.repeathere) > 0
      }
      if (tf == 0) {
        if (typeof (ShowAdHereBanner) === 'undefined' && !z.nostyle) {
          var bs = z.bannerstyles,
          sc = 'div.bsap_' + z.id + '{width:' + (z.vertical > 0 ? w + 'px' : '100%') + ';display:block}div.bsap_' + z.id + ' a{width:' + w + 'px}div.bsap_' + z.id + ' a img{padding:0}div.bsap_' + z.id + ' a em{font-style:normal}';
          for (i = 0; i < bs.length; i++) sc += 'div.bsap_' + z.id + ' ' + bs[i];
          if (w < 100) sc += 'div.bsap_' + z.id + ' a em{display:block;text-indent:-9000px}div.bsap_' + z.id + ' a{height:' + h + ';line-height:0}div.bsap_' + z.id + ' a.adhere{font-size:0}';
          sc += 'div.bsap_' + z.id + ' a{line-height:100%}div.bsap_' + z.id + ' a.adhere{width:' + w + 'px;height:' + h + 'px;line-height:' + (h * 8) + '%}html>body div.bsap_' + z.id + ' a.adhere{width:' + (w - 2) + 'px;height:' + (h - 2) + 'px}div.bsap_' + z.id + ' img.s{height:0;width:0}';
          if (z.model == 1) sc += w == 728 ? ('div.bsap_' + z.id + '{line-height:9px}div.bsap_' + z.id + ' .bsap_adhere2,div.bsap_' + z.id + ' iframe{float:left}div.bsap_' + z.id + ' .bsap_adhere2 a{height:90px;width:20px;background:url(\/\/s3.buysellads.com\/ac\/ah20x90_1.gif) no-repeat 0 0;text-indent:-9999px}') : ('div.bsap_' + z.id + '{line-height:9px}div.bsap_' + z.id + ' .bsap_adhere a{height:19px;width:' + (w - 2) + 'px;font-size:10px;background:#f1f1f1;border:1px solid #e1e1e1;border-top:none;border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px;-webkit-border-bottom-left-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px;-webkit-border-bottom-right-radius:4px;text-shadow:1px 1px 0 #fff;line-height:16px}.bsap_backfillframe{border:0}');
          css(sc)
        }
        for (i = 0, j = 0; i < c.length && (a = bsa.getads(c[i], 1)[0]); i++, (Math.random() * 100 < (z.model == 1 && z.nads > c.length ? (100 - c[i - 1].per) : empty)) || (j++, o += (a.rawframe ? ('<iframe width="' + w + '" height="' + h + '" id="ad_' + a.id + '_frame" src="' + a.rawframe + '" frameborder="0" class="bsap_adframe" scrolling="no"><\/iframe>') : (a.flash && bsa.hasFlash() ? ('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + z.width + '" height="' + z.height + '" id="bsa_flash"><param name="movie" value="' + a.flash + '"/><param name="menu" value="false"/><param name="quality" value="high"/><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always"/><param name="FlashVars" value="clickTag=' + encodeURIComponent(bsa.tracker('click.go', a.id, z.id, '', '', '&link=' + a.link.replace('[timestamp]', ts).replace(/&amp;/g, '&'))) + '"/><embed src="' + a.flash + '" width="' + z.width + '" height="' + z.height + '" quality="high" wmode="opaque" menu="false" allowScriptAccess="always" swliveconnect="true" flashvars="clickTag=' + encodeURIComponent(bsa.tracker('click.go', a.id, z.id, '', '', '&link=' + a.link.replace('[timestamp]', ts).replace(/&amp;/g, '&'))) + '" type="application/x-shockwave-flash"></embed></object>') : ('<a ' + bsa.link(a.id, z.id, a.link.replace('[timestamp]', ts)) + ' class="ad' + j + ' ' + (j % 2 === 0 ? 'even' : 'odd') + '" title="' + a.alt + '" id="bsa_' + a.id + '" target="_blank"><img src="' + a.img.replace('[timestamp]', ts) + '" width="' + z.width + '" height="' + z.height + '" alt="' + a.alt + '"\/><\/a>'))), t += a.id + ';')) {
        }
        if (z.cpmbackfill && j == 0) {
          for (var r = Math.random(), bn = 0; bn < z.cpmbackfill.length && z.cpmbackfill[bn] && z.cpmbackfill[bn][0] < r; r -= z.cpmbackfill[bn++][0]) {
          }
          if (z.cpmbackfill[bn] && z.cpmbackfill[bn][0] && z.cpmbackfill[bn][1].length > 0) {
            if (z.cpmbackfill[bn][1].substring(0, 2) != '//') {
              o += '<div id="backfill_' + z.id + '_div"></div>';
              exec.push(['backfill_' + z.id + '_div', z.cpmbackfill[bn][1]])
            } else o += '<iframe width="' + w + '" height="' + h + '" id="backfill_' + z.id + '_frame" src="' + z.cpmbackfill[bn][1] + '" frameborder="0" class="bsap_backfillframe" scrolling="no"><\/iframe>';
            backfilled = true
          }
        }
        for (i = j; !backfilled && i < z.nads && ah && (i < (ra ? z.nads : (j + 1))); i++, o += (bsa.callback(z.id, i - 1, z.nads) || '<a href="https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '\/zone\/' + z.id + '?utm_source=site_' + z.siteid + '&utm_medium=website&utm_campaign=adhere&utm_content=zone_' + z.id + '" title="Advertise Here" class="adhere ad' + i + ' ' + (i % 2 === 0 ? 'even' : 'odd') + '" target="_blank">Advertise Here<\/a>')) {
        }
        if (z.model == 1 && ah && (j == z.nads || backfilled)) o += '<div class="bsap_adhere' + (w == 728 ? '2' : '') + '"><a href="https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '\/zone\/' + z.id + '?utm_source=site_' + z.siteid + '&utm_medium=website&utm_campaign=cpmadhere&utm_content=zone_' + z.id + '" target="_blank">advertise here<\/a><\/div>'
      } else if (tf == 1) {
        ((z.model == 1 && Math.random() * 100 * z.nads < (empty || 0)) || c.length == 0) && ah && (c = [{
          id: -i,
          link: 'https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '\/zone\/' + z.id,
          img: bsa.apiurl + 'd\/adhere.png',
          alt: 'Advertise Here',
          text: 'Advertise in this spot with Automated Guaranteed Advertising Software'
        }]);
        this.bsaonecss || z.nostyle == 1 || css('.one{position:relative}.one .bsa_it_ad{display:block;padding:15px;border:1px solid #e1e1e1;background:#f9f9f9;font-family:helvetica,arial,sans-serif;line-height:100%;position:relative}.one .bsa_it_ad a{text-decoration:none}.one .bsa_it_ad a:hover{text-decoration:none}.one .bsa_it_ad .bsa_it_t{display:block;font-size:12px;font-weight:bold;color:#212121;line-height:125%;padding:0 0 5px 0}.one .bsa_it_ad .bsa_it_d{display:block;font-size:11px;color:#434343;font-size:12px;line-height:135%}.one .bsa_it_ad .bsa_it_i{float:left;margin:0 15px 10px 0}.one .bsa_it_p{display:block;text-align:right;position:absolute;bottom:10px;right:15px}.one .bsa_it_p a{font-size:10px;color:#666;text-decoration:none}.one .bsa_it_ad .bsa_it_p a:hover{font-style:italic}');
        this.bsaonecss = 1;
        o += '<div class="bsa_it one">';
        for (i = 0, a; i < c.length && (a = bsa.getads(c[i], 1)[0]); i++, (j++, o += '<div class="bsa_it_ad ad' + i + ' ' + (i % 2 === 0 ? 'even' : 'odd') + '" id="bsa_' + a.id + '"><a ' + bsa.link(a.id, z.id, a.link.replace('[timestamp]', ts)) + ' target="_blank"><span class="bsa_it_i"><img src="' + a.img.replace('[timestamp]', ts) + '" width="' + z.width + '" height="' + z.height + '" alt="' + a.alt + '" \/><\/span><\/a><a ' + bsa.link(a.id, z.id, a.link) + ' target="_blank"><span class="bsa_it_t">' + a.alt + '<\/span><span class="bsa_it_d">' + a.text + '<\/span><\/a><div style="clear:both"><\/div><\/div>', t += a.id + ';')) {
        }
        if (z.cpmbackfill && j == 0) {
          for (var r = Math.random(), bn = 0; bn < z.cpmbackfill.length && z.cpmbackfill[bn] && z.cpmbackfill[bn][0] < r; r -= z.cpmbackfill[bn++][0]) {
          }
          if (z.cpmbackfill[bn] && z.cpmbackfill[bn][0] && z.cpmbackfill[bn][1].length > 0) {
            o += '<iframe width="' + w + '" height="' + h + '" id="backfill_' + z.id + '_frame" src="' + z.cpmbackfill[bn][1] + '" frameborder="0" class="bsap_backfillframe" scrolling="no"><\/iframe>';
            backfilled = true
          }
        }
        for (i = j; !backfilled && (typeof (bsa.callback) == 'function') && i < z.nads; i++, o += bsa.callback(z.id, i - 1, z.nads) || '') {
        }
        if (c.length > 0) o += '<span class="bsa_it_p"><a href="https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '\/zone\/' + z.id + '?utm_source=site_' + z.siteid + '&utm_medium=website&utm_campaign=imagetext&utm_content=zone_' + z.id + '" target="_blank">ads by BSA<\/a>' + (z.carrousel ? '<br/><a href="#" class="prevad" onclick="_bsap.inv[' + z.id + ']()">&larr;<\/a> <a href="#" class="nextad" onclick="_bsap.inv[' + z.id + ']()">&rarr;<\/a>' : '') + '<\/span><\/div>'
      } else if (tf == 2) {
        c.length == 0 && ah && c.push({
          id: -i,
          link: 'https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '\/zone\/' + z.id,
          title: 'Advertise Here',
          text: 'Advertise in this spot with Automated Guaranteed Advertising Software'
        });
        this.textlinkscss == 1 || z.nostyle == 1 || css('.bsa_padint{font-family:helvetica,arial,verdana,sans-serif;font-size:12px;position:relative}.bsa_padint ul.bsa_ads{list-style-type:none;margin:0;padding:0}.bsa_padint ul.bsa_ads li{margin:0;padding:0;position:relative}.bsa_padint ul.bsa_ads em.bt{color:#06c;font-size:14px;font-weight:700;text-decoration:underline}div.bsa_idb{border-top:1px solid #f1f1f1;bottom:0;color:#999;font-size:10px;height:5px;left:0;margin:0;padding:0;position:absolute;width:100%}div.bsa_idb .bsa_idl{background:#fff;bottom:2px;line-height:7px;padding:0 3px;position:absolute;right:5px}div.bsa_idb a{color:#999;height:3px;margin:0;padding:0;text-decoration:none}div.bsa_idb a em{font-style:normal}div.bsa_idb a:hover{background:none;color:#666}div.bsa_idb a:hover em{font-style:italic}ul.bsa_ads li *{cursor:pointer}.bsapvariable{overflow:hidden;visibility:visible;width:auto}.bsapvariable ul.bsa_ads li{float:left;padding:5px;text-align:left;width:250px}div.bsapvariable ul.bsa_ads li a,div.bsapvariable div.bsa_idb span.bsa_idl,div.bsapvariable div.bsa_idb{clear:both;height:auto;margin:0;position:relative;text-decoration:none;width:250px}.bsa_padint ul.bsa_ads em{display:block;font-style:normal}div.bsapvariable .bsa_padint ul.bsa_ads em.bd{color:black;text-decoration:none}div.bsapvariable div.bsa_idb a{display:block;height:13px;text-align:right;width:250px}.bsa_padint ul.bsa_ads a:hover,.bsa_padint ul.bsa_ads a:hover div.bwr{background-color:#f7f7f7}');
        this.textlinkscss = 1;
        o += '<div class="bsap_unit bsapvariable"><div class="bsa_padint"><ul class="bsa_ads">';
        for (i = 0, a; i < c.length && (a = bsa.getads(c[i], 1)[0]); i++, o += '<li class="bsapt_' + a.id + ' ad' + i + ' ' + (i % 2 === 0 ? 'even' : 'odd') + '"><a ' + bsa.link(a.id, z.id, a.link) + ' target="_blank"><div class="bwr"><em class="bt">' + a.title + '<\/em><em class="bd">' + a.text + '<\/em><\/div><\/a><\/li>', t += a.id + ';') {
        }
        for (i = j; (typeof (bsa.callback) == 'function') && i < z.nads; i++, o += bsa.callback(z.id, i - 1, z.nads) || '') {
        }
        o += '<\/ul>';
        if (c.length > 0) o += '<div class="bsa_idb"><span class="bsa_idl"><a href="https:\/\/www.buysellads.com\/buy\/detail\/' + z.siteid + '?utm_source=site_' + z.siteid + '&utm_medium=website&utm_campaign=textdesc&utm_content=zone_' + z.id + '" target="_blank">ads by <em>BSA<\/em><\/a><\/span><\/div><\/div><\/div>'
      } else if (tf == 4) {
        css('div.bsap_' + z.id + '{' + z.bannerstyles.join("\n") + '}');
        var a = c.length > 0 ? bsa.getads(c[0], 1)[0] : null;
        if (a && (Math.random() * 100 > (z.model == 1 && z.nads > c.length ? (100 - c[0].per) : empty))) {
          b.style.backgroundImage = 'url(' + a.img.replace('[timestamp]', ts) + ')';
          b.className = b.className + ' bsa_hasads';
          b.onclick = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            if (target.getAttribute('id') == ('bsap_' + z.id)) {
              var url = document.createElement('span');
              url.innerHTML = a.link;
              window.location = bsa.tracker('click.go', a.id, z.id, '', '', '&link=' + url.textContent.replace('[timestamp]', ts))
            }
          };
          t += a.id
        }
      }
      if (o && !b.innerHTML.length) {
        b.innerHTML = o;
        if (exec.length) for (i = 0; i < exec.length; i++) setInnerHtmlAndExec(document.getElementById(exec[i][0]), exec[i][1])
      }
      _bsap.rocks('imp', t, z.id)
    }, z.waitforgeo)
  },
  getads: function (d, n) {
    var b = '', c, a = d.ads, tdiff = 0, ret = [], got = [], i;
    if (this.oshow) {
      for (i = 0; i < a.length; i++) {
        if (a[i].id == this.oshow) {
          a[i].per = 100;
          a[i].ads = [a[i]];
          return [a[i]]
        } else if (a[i].id <= 0) {
          if ((c = this.getads(a[i], 1))) return c
        }
      }
      return false
    }
    if (!a) return [d];
    if (a.length <= n || a.length === 1) return this.shuffle(a);
    for (i = 0; i < a.length; i++) b += new Array(a[i].per + 1).join(i + ',');
    b = b.substr(0, b.length - 1).split(',');
    while (ret.length < n && i++ < n * 100 && (c = a[b[Math.floor(Math.random() * b.length)]])) if (n === 1) return [c]; else if (!got[c.id]) {
      got[c.id] = 1;
      ret.push(c)
    }
    return ret
  },
  shuffle: function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
    return o
  },
  filter: function (fs, fn, noto) {
    var s = ['all'];
    if (!fs) fn(s);
    if (fs.os && fs.os[(os = (/(win|mac|linux|iphone|blackberry|pike)/.exec(navigator.platform.toLowerCase()) || ['?'])[0])]) s.push(os);
    if (fs.geo) {
      IAmGot.push(fn);
      var got = 0, c = document.cookie, i = c.indexOf('country=');
      IAm = function (y) {
        if (y !== '?') {
          var d = new Date(), nd = +d;
          d.setTime(30 * 3600000 + nd);
          document.cookie = 'country=' + y + '; expires=' + d.toGMTString() + '; path=\/'
        }
        if (IAmGot.length > 0) {
          s.push(y);
          for (var li = 0; li < IAmGot.length; li++) IAmGot[li](s);
          IAmGot = []
        }
      };
      if (i >= 0) IAm(c.substring(i + 7 + 1).split(';')[0]); else {
        var e = document.createElement('script');
        e.type = 'text\/javascript';
        e.src = document.location.protocol + '\/\/stats.buysellads.com\/country.php';
        document.getElementsByTagName('head').item(0).appendChild(e);
        if (!noto) setTimeout(function () {
          IAm('?')
        }, 100)
      }
    } else fn(s)
  },
  interpret_json: function (a) {
    this.jz = typeof this.jz == 'object' ? this.jz.concat(a.zones) : a.zones;
    this.deploy()
  },
  rocks: function (t, b, z) {
    var u = this.gen('bsau', 30), s = this.gen('bsas', 1 / 48), img = new Image();
    img.src = this.tracker(t + '.gif', b, z, u, s, '')
  },
  link: function (b, z, l) {
    return 'href="' + this.tracker('click.go', b, z, '', '', '&link=' + l) + '" onmouseover="window.status = \'' + l + '\'; return true;" onmouseout="window.status=\'\'; return true;"'
  },
  tracker: function (t, b, z, u, s, additional) {
    return '\/\/stats.buysellads.com\/' + t + '?z=' + z + '&b=' + b + '&g=' + u + '&s=' + s + '&sw=' + screen.width + '&sh=' + screen.height + '&br=' + this.br() + '&r=' + Math.random() + additional
  },
  br: function () {
    var a = navigator.userAgent, p = navigator.platform, m = function (r, h) {
      for (var i = 0; i < h.length; i++) r = r.replace(h[i][0], h[i][1]);
      return r
    },
    i = (a.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? m(a, [[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''], ['Chrome Safari', 'Chrome'], ['Minefield', 'Firefox']]) : a).toLowerCase();
    return [(/(camino|chrome|firefox|opera|msie|safari)/.exec(i) || ['', '?'])[1], parseFloat((/(camino|chrome|firefox|opera|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/.exec(i) || [0, 0, 0, 0])[3], 10) || 0, (/(win|mac|linux|iphone|blackberry|pike)/.exec(p.toLowerCase()) || ['?'])[0]]
  },
  gen: function (w, e) {
    var c = document.cookie, i = c.indexOf(w + '=');
    if (i >= 0) return c.substring(i + w.length + 1).split(';')[0]; else {
      var d = new Date(), nd = +d;
      d.setTime(e * 3600000 + nd);
      document.cookie = w + '=' + (nd + Math.random().toString().substr(2, 7)) + '; expires=' + d.toGMTString() + '; path=\/';
      return -1
    }
  },
  hasFlash: function () {
    var gotit = false;
    try {
      var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) gotit = true
    } catch (e) {
      if (navigator.mimeTypes["application/x-shockwave-flash"] != undefined) gotit = true
    }
    return gotit
  }
};
_bsap_loadedme = 1;
if (typeof (_bsap_loadme) === 'object') {
  for (var _bi = 0; _bi < _bsap_loadme.length; _bi++) {
    _bsap_loadme[_bi]();
    _bsap_loadme[_bi] = function () {
    }
  }
}
if (document.addEventListener) document.addEventListener('DOMContentLoaded', function () {
  _bsap.exec()
}, false); else if ((/msie/.test(navigator.userAgent.toLowerCase())) && window == top) {
  (function () {
    try {
      document.documentElement.doScroll('left')
    } catch (error) {
      setTimeout(arguments.callee, 0);
      return
    }
    _bsap.exec()
  })();
  window.document.onreadystatechange = function () {
    if (window.document.readyState == 'complete') {
      window.document.onreadystatechange = null;
      _bsap.exec()
    }
  }
}
IAmGot = [];
(function () {
  var dequeue;
  oldonload = window.onload;
  window.onload = dequeue = function () {
    _bsap.exec();
    if (oldonload && dequeue != oldonload) oldonload()
  }
});
_bsap.exec();