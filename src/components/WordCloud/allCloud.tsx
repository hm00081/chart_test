import Word from './Word';
import Intermediation from './Intermediation';
import Representation from './Representation';
import Visvar from './Visvar';
import Vistech from './Vistech';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

const AllCloud = () => {
    return (
        <>
            <ParentSize>{({ width, height }) => <Word width={width} height={height} />}</ParentSize>
            {/* <ParentSize>{({ width, height }) => <Intermediation width={width} height={height} />}</ParentSize>
            <ParentSize>{({ width, height }) => <Representation width={width} height={height} />}</ParentSize>
            <ParentSize>{({ width, height }) => <Visvar width={width} height={height} />}</ParentSize>
            <ParentSize>{({ width, height }) => <Vistech width={width} height={height} />}</ParentSize> */}
        </>
    );
};

export default AllCloud;
