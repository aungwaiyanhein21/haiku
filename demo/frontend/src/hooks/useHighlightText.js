import React, { useState, useCallback } from 'react';

const useHighlightText = ({ haikuData, highlightPass1, highlightPass2 } ) => {
    
    const [passageNode, setPassageNode] = useState(null);

    // temporary measures. Code should be refactored in a consistent way so that we don't need to do this.
    let keyFormatUnderscore = false;
    if ('passage_1_indexes' in haikuData || 'passage_2_indexes' in haikuData) {
        keyFormatUnderscore = true;
    }



    const passage1Style = {
        backgroundColor: "green",
        color: "white"
    };
    const passage2Style = {
        backgroundColor: "blue",
        color: "white"
    };

    // NOTE: the index of selection not equal to the counting of characters even if we start from 0
    // eg. The text "sth is fun". The highlighted text is "sth is". 
    // in the above example, startoffset will be 0 and endoffset will be 6.
    const createSelectionRange = (translationNode, num) => {
        let range = document.createRange();

        if (keyFormatUnderscore) {
            range.setStart(translationNode.firstChild, haikuData[`passage_${num}_indexes`][0]);
            range.setEnd(translationNode.firstChild, haikuData[`passage_${num}_indexes`][1]);
        }
        else {
            range.setStart(translationNode.firstChild, haikuData[`passage${num}Indexes`][0]);
            range.setEnd(translationNode.firstChild, haikuData[`passage${num}Indexes`][1]);
        }
      

        return range;
    };

    const createMarkTag = (passageStyle) => {
        let mark = document.createElement('mark');
        mark.style.backgroundColor = passageStyle['backgroundColor'];
        mark.style.color = passageStyle['color'];
        mark.style.padding = "2px";

        return mark;
    };

    const highlightText = (translationNode) => {
        if (highlightPass1 && highlightPass2) {
            // highlight chosen passage 1 and 2.
            let passage1Range = createSelectionRange(translationNode, "1");
            let passage2Range = createSelectionRange(translationNode, "2");

            let passage1MarkEle = createMarkTag(passage1Style);
            let passage2MarkEle = createMarkTag(passage2Style);

            passage1Range.surroundContents(passage1MarkEle);
            passage2Range.surroundContents(passage2MarkEle);
        }
        else if (highlightPass1) {
            // highlight only chosen passage 1
            let passage1Range = createSelectionRange(translationNode, "1");
            let passage1MarkEle = createMarkTag(passage1Style);
            passage1Range.surroundContents(passage1MarkEle)
        }
        else if (highlightPass2) {
            let passage2Range = createSelectionRange(translationNode, "2");
            let passage2MarkEle = createMarkTag(passage2Style);
            passage2Range.surroundContents(passage2MarkEle);
        }
    };

    const [funcRef, setFuncRef] = useState(null);

    const resetHighlight = (node) => {
        console.log(node);
        node.innerHTML = node.innerText;
    };

    const translationRefHook = useCallback((translationNode) => {
        console.log(translationNode);
        if (translationNode) {
            highlightText(translationNode);

            setPassageNode(translationNode);
            console.log('here again');
            
            // setTimeout(() => resetMark(translationNode), 3000);
        } 
    }, [haikuData]);

    return { translationRefHook, resetHighlight, passageNode };
};

export default useHighlightText;