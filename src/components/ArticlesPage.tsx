import { useState, useCallback } from 'react'

interface Article {
  id: number
  title: string
  content: string
  image: string
  date: string
}

const articles: Article[] = [
  {
    id: 1,
    title: '澶渊之盟',
    date: '2024.01.15',
    image: './images/articles/宋真宗.jpeg',
    content: `与辽国议和的特使出发前，宋真宗专门将他叫到跟前，说："实在不行许给那些契丹人一些钱财也无所谓，比如每年给个一百万。。。"

特使接旨退下，半道被寇准拦下了。寇准压低声音对他说："虽然皇上点头了，但是超过30万，我砍了你的头！"

此时宋辽两国已经断断续续打了二十年，两方疲惫，辽国摄政的萧太后也早有罢兵议和的想法，但也没有平白休兵的道理。此次，辽国倾全国兵力南下，不是想把宋国灭掉，只不过想要在谈判桌上重重压上个筹码。宋真宗也明白对方的意图，因此亲自到澶渊督战，务求在战场上打出气势，另一方面则派遣特使谈判议和。这便是影响了整个中国思想界和历史进程的"澶渊之盟"的订立背景，此后宋辽两国保持了120年的和平，成就了大宋达到中华文明之巅。

有些人可能觉得这是很屈辱的条约，但对于务实的宋人来说，这是花小钱办了大事。根据条约，宋国从此每年向辽国交绢二十万匹，银一十万两，作为条件辽国从此罢兵。

当主持议和的特使归来觐见皇上，真宗正在幕内用膳。他便让太监出去去了解情况，特使不敢大声说话，便朝着太监举了三指点了一下额头，太监会意，退回幕内向皇上禀报说议和用了三百万。真宗听罢，说道："太多了，但也罢了，先就这样吧。"

可见用三百万来换这场和平在宋真宗的心目中是可以接受的。

也可见宋朝财力之雄厚，辽国拿了30万便已经心满意足了。因为富裕，大宋就是喜欢用钱来摆平事情，甚至军队也是用钱招来的，即采用的是募兵制。这是其他朝代未曾有过的。

但钱不能解决所有的问题，到了关键时刻更是如此。用钱买不来燕云十三州，赎不来宋徽宗的自由身，也挡不住蒙古骑兵的铁骑。`
  },
  {
    id: 2,
    title: '管宁割席',
    date: '2024.01.10',
    image: './images/articles/管宁割席.jpg',
    content: `《管宁割席》是《世说新语》里非常有名的一则故事。

话说东汉末年有这么两位年轻的好友，一位叫管宁一位叫华歆，他们怀揣梦想，同窗苦读，作息相伴。一日俩人在园中锄地，见到地上掉有片金一块，管宁视若无睹，华歆却停下锄头，俯身捡起审视片刻，扔到一边。又有一日，两人在屋中静坐读书，突然闻得窗外喧嚣，有一辆豪华马车路过。管宁依旧不闻不顾，而华歆却放下书本，跑到门外看个究竟。等到华歆回到座位，管宁竟一刀剪下两人间的坐席，言道："子非吾友也。"

世人皆言管宁境界之高可为万世读书人之表率，而华歆相较之下区区一俗子尔！然则，华歆是三国曹魏重臣，以德性品格名重天下，虽然因是曹营中人，后世贬损颇多，但因曹操而恨屋及乌，则大失公允了。

反观管宁，一生拒绝入仕，终生为隐士，谈经典谈礼教，为时人所敬仰，在若此之乱世逝于八十四高龄。正如山林之秋菊，孤芳高洁，但却绝了人间气，只堪远观称羡，难做世人之榜样。

身处乱世，是积极入世还是归隐山林取决于个人的价值观，本无优劣可言，但对于绝大多数人来说却是无可选择的。如竹林七贤的嵇康，拼命想躲最终还是躲不过，留下广陵绝唱，博得后世哀叹。毕竟人无法切断与社会的关系，切断了就不能成其为人了。中国的传统自古最重积极入世的思想，归隐只是士大夫们追寻的精神层面的慰藉罢了。所谓大隐隐于市，求道何必高山远水。

《世说新语》还记有华歆的一则故事。话说华歆和王朗乘船避难，遇一人仓皇跑来依附，华歆面露难色，而王朗却爽快答应了。等到贼人追至，形势危急，王朗便意欲抛下那人，却被华歆制止。华歆道："当初此人来投奔，我有所犹豫，正是担心会有这一出。但既然我们已经接纳，就算形势紧迫，岂能反悔抛弃？"

苟活于俗世却能保持高洁品德，不以功利心应物，这比单纯归隐遁世难得多吧！

所谓以出世的精神做入世的事业，华歆的境界实际比管宁高呀。`
  },
  {
    id: 3,
    title: '清苦的范仲淹',
    date: '2024.01.05',
    image: './images/articles/范仲淹.jpeg',
    content: `范仲淹年轻时独自在南京求学，生活极其清苦，粥吃不饱，晚上被盖都不够要和衣睡觉。

毕竟他两岁丧父，母亲改嫁到朱姓人家，寄人篱下的童年绝不可能是欢乐的回忆。

当他23岁时得知身世，毅然离开朱家时，母亲追上来挽留，他发誓十年内必然中第回来接母亲。

可见娘俩在朱家并不好过。

这个时候他的名字叫朱说。

一日皇帝来南京视察，同学们纷纷跑出去凑热闹，唯独范仲淹独自不出，与其说是有管宁的风采，倒不如说身上背负太多。科举不第，天下哪里是容身之地？

同学怜其贫困，慕其人品才学，向留守提及他的种种艰难，送了一份美味佳肴给他。

因为这位同学是留守大人的儿子。

范仲淹收下佳肴，谢过同学，但一直放到腐烂都不肯吃上一口。

同学不解，问其原因，范仲淹回答，如果我吃了这么美味的东西，接下来的粥我可怎么吃的下呀！

正是曾经沧海难为水，人的种种痛苦就是体验过太好的东西。相比之下眼前的平淡便只有了苦涩。

27岁范仲淹考中进士，授任广德军司理参军，随即将母亲接了过来，提前5年兑现了自己的诺言。

29岁他改回本姓，从此就有了我们熟悉的范仲淹。

他后来虽然位极人臣，但一生保持着清俭的习惯，非宴客食不重肉，但也苦了家人。他可能时常会想起22岁那年在长山的山寺读书，每日煮一锅粥，分成四块，早晚取两块加点荠菜和盐就是一餐了。年少时的苦日子也许会让一些人狭隘而偏激，但也可以让范仲淹这样的人磨练出"先天下之忧而忧，后天下之乐而乐"的博大胸怀。`
  }
]

export function ArticlesPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedArticle(null)
  }, [])

  const openArticle = (article: Article) => {
    setSelectedArticle(article)
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
  }

  const closeArticle = () => {
    setSelectedArticle(null)
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }

  return (
    <section className="pt-24 pb-16 px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-medium text-foreground mb-4">
            文章墙
          </h1>
          <p className="text-sm text-muted-foreground">历史人文叙事 · 叙议结合</p>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex gap-4 bg-white rounded-xl p-4 card-shadow cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => openArticle(article)}
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  {article.title}
                </h3>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
          onClick={closeArticle}
        >
          <div
            className="bg-[#F5F0E8] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Article Header Image */}
            <div className="relative">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors"
                onClick={closeArticle}
              >
                ✕
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 lg:p-8">
              <h2 className="text-2xl font-serif font-medium text-foreground mb-2">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-muted-foreground mb-6">{selectedArticle.date}</p>
              <div className="prose prose-sm max-w-none">
                {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-foreground/80 leading-relaxed mb-4 indent-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
