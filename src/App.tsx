import FinalSankey from './FinalSankey';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';
import Word from './components/WordCloud/Word';
import Intermediation from './components/WordCloud/Intermediation';
import Representation from './components/WordCloud/Representation';
import Visvar from './components/WordCloud/Visvar';
import Vistech from './components/WordCloud/Vistech';
import './sandbox-styles.css';
import withStyles from './FinalCirclePack';
import StackedBarChart from './components/BarChart/BarChart';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import AllCloud from './components/WordCloud/allCloud';

const SankeySize = styled.div``;
//@ts-ignore
const draw = <withStyles />;
//@ts-ignore
const barChart = <StackedBarChart />;

function App() {
    const isPc = useMediaQuery({
        query: '(min-width:1024px)',
    });
    const isTablet = useMediaQuery({
        query: '(min-width:768px) and (max-width:1023px)',
    });
    const isMobile = useMediaQuery({
        query: '(max-width:767px)',
    });
    return (
        <>
            {isPc || isTablet}
            <SankeySize>
                <FinalSankey />
            </SankeySize>
            {/* <ParentSize>{({ width, height }) => <StackedBarChart width={width} height={height} />}</ParentSize> */}
            {/* {draw} */}
            {/* <AllCloud /> */}
        </>
    );
}

export default App;
