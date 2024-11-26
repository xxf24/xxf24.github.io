const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.D66PEx1R.js","assets/chunks/framework.D5y5L8WJ.js"])))=>i.map(i=>d[i]);
import{_ as t,a as l,b as a,e as i,R as o,aa as n,f as s,o as d,ab as p}from"./chunks/framework.D5y5L8WJ.js";const _=JSON.parse('{"title":"滑动拼图","description":"","frontmatter":{"lastUpdateTime":"2024-11-26T01:09:41.000Z","date":"2023/6/27","title":"滑动拼图","category":"练习","tags":["小游戏","算法"]},"headers":[],"relativePath":"notes/ep/sliding-puzzle.md","filePath":"notes/ep/sliding-puzzle.md"}'),h={name:"notes/ep/sliding-puzzle.md"};function u(m,e,f,b,g,z){const r=s("DemoWrapper");return d(),l("div",null,[e[0]||(e[0]=a("p",null,"前段时间在便利店排队结账时，看到有小孩在玩一个拼图相关的玩具，通过利用地图上的一个空位来不断挪动其它拼图的位置，最终复原出被打乱的拼图。",-1)),e[1]||(e[1]=a("p",null,"想起自己小时候也玩过类似的玩具，不过那时候怎么都拼不出来，后来发现可以大力出奇迹，先把拼图全抠出来，再按顺序一个个装回去 😳。",-1)),e[2]||(e[2]=a("p",null,"现在我尝试动手做了一版，终于是能够正常拼出来了 😎。",-1)),e[3]||(e[3]=a("h2",{id:"试玩",tabindex:"-1"},[i("试玩 "),a("a",{class:"header-anchor",href:"#试玩","aria-label":'Permalink to "试玩"'},"​")],-1)),o(r,{loader:()=>p(()=>import("./chunks/index.D66PEx1R.js"),__vite__mapDeps([0,1]))}),e[4]||(e[4]=n('<h2 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h2><h3 id="实现开局乱序" tabindex="-1">实现开局乱序 <a class="header-anchor" href="#实现开局乱序" aria-label="Permalink to &quot;实现开局乱序&quot;">​</a></h3><h3 id="实现自动求解" tabindex="-1">实现自动求解 <a class="header-anchor" href="#实现自动求解" aria-label="Permalink to &quot;实现自动求解&quot;">​</a></h3><h2 id="后记" tabindex="-1">后记 <a class="header-anchor" href="#后记" aria-label="Permalink to &quot;后记&quot;">​</a></h2><p>突然知道小时候拼不出的一大原因了，因为相对于移动数字来说，移动图片要更难些（至少对我来说） 😭。 在移动数字时，我可以很轻松地获取到如下信息：</p><ul><li>某个数字块最终应该移动到哪个格子</li><li>两个数字块最终的相对位置：谁在上，谁在下，谁在左，谁在右</li></ul><p>而换成图片，我就不能直观的获取到这些信息，脑海中得先做一层将图片到数字的转换，难度自然就上去了。</p><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2><ul><li><a href="https://en.wikipedia.org/wiki/15_Puzzle" target="_blank" rel="noreferrer">15 puzzle | 维基百科</a></li><li><a href="https://leetcode.cn/problems/sliding-puzzle/" target="_blank" rel="noreferrer">773. 滑动谜题 | 力扣</a></li><li><a href="https://algorithmsinsight.wordpress.com/graph-theory-2/a-star-in-general/implementing-a-star-to-solve-n-puzzle/" target="_blank" rel="noreferrer">implementing-a-star-to-solve-n-puzzle</a></li></ul>',9))])}const k=t(h,[["render",u]]);export{_ as __pageData,k as default};
