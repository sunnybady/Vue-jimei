<script>
// 导入所有对象，并给这些对象合并在一起，然后起个名字叫 echarts
import * as echarts from 'echarts';

export default {
    data () {
        return {
            myChart: null,
            myline:null
        }
    },
    methods: {
        changeType1 (type, x, y) {
            this.myChart.setOption({
                title: {
                    text: '收款方式占比'
                },
                tooltip: {},
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    data: x || ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: type || 'pie',
                        data: y || [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        },
        changeType2 (type, x, y) {
            this.myline.setOption({
                title: {
                    text: '客数走势'
                },
                tooltip: {},
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    data: x || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: type || 'pie',
                        data: y || [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    },
    mounted () {

        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        this.changeType1('pie')
        this.myline= echarts.init(document.getElementById('line'));
        this.changeType2('line')
    }
}

</script>
<template>
    <div class="show-echarts">
    <div id="main"></div>
    <div id="line"></div></div>
</template>

<style lang="scss" scoped>
#main {
    width: 40%;
    height: 400px;
    background-color: white;
}
#line {
    width: 60%;
    height: 400px;
    background-color: white;
}
.show-echarts {
    display: flex;
}
</style>