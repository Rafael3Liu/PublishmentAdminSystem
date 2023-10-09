import Bar from '@/components/Bar'
import './index.scss'
//思路：1.看官方文档， 把echart加入项目
//查看文档后发现需要获取DOM，->使用useRef，需要在useEffect节点获取
//2.不丑里定制化参数，把最小化的Demo跑起来
//3.哪些参数需要自定义，抽象出来

function Home() {
  return (
    <div>
      <Bar
        title="satisfaction of React"
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        style={{ width: '500px', height: '400px' }}
      />
      <Bar
        title="satisfaction two of React"
        xData={['react', 'vue', 'angular']}
        yData={[60, 70, 80]}
        style={{ width: '300px', height: '200px' }}
      />
    </div>
  )
}

export default Home
