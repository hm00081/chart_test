import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import { Wordcloud } from '@visx/wordcloud';
import { Target } from './text.fixture';
import { totoAfricaLyricss } from './text.fixtures';
import styled from 'styled-components';
import { LinkColor, SankeyData } from '../../types/sankey';
import Intermediation from './Intermediation';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

const Wordclouds = styled.div`
    display: flex;
    height: auto;
    flex-direction: column;
    user-select: none;
    padding-right: 550px;
    padding-top: -320px;
`;

interface WordProps {
    width: number;
    height: number;
    showControls?: boolean;
}

export interface WordData {
    text: string;
    value: number;
}

const color: LinkColor[] = ['grayLinkColor', 'blueLinkColor', 'grayLinkColor', 'rubyLinkColor'];

function wordFreq(text: string): WordData[] {
    const words: string[] = text.replace(/\./g, '').split(/\s/);
    const freqMap: Record<string, number> = {}; // Record: 유틸리티 타입

    for (const w of words) {
        if (!freqMap[w]) freqMap[w] = 0;
        freqMap[w] += 1;
    }
    return Object.keys(freqMap).map((word) => ({
        text: word,
        value: freqMap[word],
    }));
}

function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
}

// const words = wordFreq(Target.words as string);
const words = wordFreq(Target);
console.log(words);

const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [5, 32],
});

const setColor = (words: WordData[]) => {};

const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

const fontColorSetter = (datum: WordData) => {
    console.log(datum.value);
};

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

export default function Word({ width, height, showControls }: WordProps) {
    const [spiralType, setSpiralType] = useState<SpiralType>('archimedean');
    const [withRotation, setWithRotation] = useState(false);
    return (
        <div className="wordcloud">
            <Wordclouds>
                <Wordcloud
                    words={words}
                    width={width / 4}
                    height={height}
                    fontSize={fontSizeSetter}
                    font={'Helvetica'}
                    padding={2.5}
                    spiral={'archimedean'}
                    rotate={withRotation ? getRotationDegree : 1}
                    random={fixedValueGenerator}
                >
                    {(cloudWords) =>
                        cloudWords.map((w, i) => (
                            <Text
                                style={{ fontWeight: 'bolder' }}
                                key={w.text}
                                fill={words[i].value >= 5 ? 'hsl(110, 50%, 55%)' : 'hsl(10, 0%, 85%)'}
                                textAnchor={'middle'}
                                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                                fontSize={w.size}
                                fontFamily={w.font}
                            >
                                {w.text}
                            </Text>
                        ))
                    }
                </Wordcloud>
            </Wordclouds>
            {showControls && (
                <div>
                    <label>
                        Spiral type &nbsp;
                        <select onChange={(e) => setSpiralType(e.target.value as SpiralType)} value={spiralType}>
                            <option key={'archimedean'} value={'archimedean'}>
                                archimedean
                            </option>
                            <option key={'rectangular'} value={'rectangular'}>
                                rectangular
                            </option>
                        </select>
                    </label>
                    <label>
                        With rotation &nbsp;
                        <input type="checkbox" checked={withRotation} onChange={() => setWithRotation(!withRotation)} />
                    </label>
                    <br />
                </div>
            )}
        </div>
    );
}
