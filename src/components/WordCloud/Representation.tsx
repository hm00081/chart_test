import React, { useState } from 'react';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import { Wordcloud } from '@visx/wordcloud';
import { Target, Intermediation, Representation, Visvar, Vistech } from './text.fixture';
import { totoAfricaLyricss } from './text.fixtures';
import styled from 'styled-components';
import { LinkColor, SankeyData } from '../../types/sankey';

const Wordclouds = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    //padding-left: 50px;
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

// const wordsss = wordFreq(Representation.words as string);
const wordsss = wordFreq(Representation);

const colors = () => {
    let color: string = '' as const;
    wordsss.forEach((word) => {
        if (word.value > 10) {
            color = 'hsl(210, 80%, 55%)';
        } else color = 'hsl(253, 86%, 38%)';
    });
    return color;
}; // select color

const fontScale = scaleLog({
    domain: [Math.min(...wordsss.map((w) => w.value)), Math.max(...wordsss.map((w) => w.value))],
    range: [5, 30],
});

const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

type SpiralType = 'archimedean' | 'rectangular';

export default function Word({ width, height, showControls }: WordProps) {
    const [spiralType, setSpiralType] = useState<SpiralType>('archimedean');
    const [withRotation, setWithRotation] = useState(false);
    return (
        <div className="wordcloud">
            <Wordclouds>
                <Wordcloud
                    words={wordsss}
                    width={width / 4}
                    height={height}
                    fontSize={fontSizeSetter}
                    font={'Helvetica'}
                    padding={2.5}
                    spiral={'archimedean'}
                    rotate={withRotation ? getRotationDegree : 0}
                    random={fixedValueGenerator}
                >
                    {(cloudWords) =>
                        cloudWords.map((w, i) => (
                            <Text
                                style={{ fontWeight: 'bolder' }}
                                key={w.text}
                                fill={wordsss[i].value >= 7 ? 'hsl(210, 80%, 55%)' : 'hsl(10, 0%, 85%)'}
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
