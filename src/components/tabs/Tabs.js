import React, { useState, useRef, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'
import ConfirmDialogBox from '../confirmDialogBox/ConfirmDialogBox';

const initialTabs = [
    {label: "Tab1", body: "Tab 1 detail"},
    {label: "Tab2", body: "Tab 2 detail"},
    {label: "Tab3", body: "Tab 3 detail"}
]

const TAB_LIMIT = 10;

const Tabs = (props) => {
    const [tabs, setTabs] = useState(initialTabs);
    const [currentTab, setCurrentTab] = useState(0);
    const [isSliderEnable, setIsSliderEnable ] = useState(false)
    const [isLeftButtonEnable, setIsLeftButtonEnable] = useState(false)
    const [isRightButtonEnable, setIsRightButtonEnable] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState()
    const tabListRef = useRef(null);

    useEffect(()=>{
        if (tabListRef.current) {
            let visibleTab = tabListRef.current.scrollWidth > tabListRef.current.clientWidth;
      
            if (visibleTab !== isSliderEnable) {
              setIsSliderEnable(visibleTab)
            }
          }
    })

    const addTab = () => {
        if (tabs.length < TAB_LIMIT) {
          let modifyTabs = tabs;
          modifyTabs.push({
            label: `Tab${modifyTabs.length + 1}`,
            body: `Tab ${modifyTabs.length + 1} detail`,
          });
          updateTabs(modifyTabs, true);
        }
    }

    const switchTabs = (currentTab) => {
       setCurrentTab(currentTab);
      };

     const handleListItemClick = (index, e) => {
        e.stopPropagation();
        if (index !== currentTab) {
          switchTabs(index, e);
        }
      };

    const updateTabs = (modifyTabs, switchTab) => {

        setTabs([...modifyTabs])
     
        if (switchTab) {
            setCurrentTab(modifyTabs.length - 1)
            moveLeft();
        }
      };

    const handleTabDelete = (event, index) => {
   
       setDeleteIndex(index)
   
    }

    const confirmCallback = (value) => {
        if(value){
            let modifyTabs = tabs
            modifyTabs.splice(deleteIndex, 1);
            updateTabs(modifyTabs);
            deleteIndex === 0 ? switchTabs(deleteIndex) : switchTabs(deleteIndex - 1);
            setDeleteIndex()
        }
        else{
            setDeleteIndex()
        }
    }

    const moveLeft = () => {
        tabListRef.current.className = 'smoothScroll'
        tabListRef.current.scrollLeft += 400;
    }

    const moveRight = () => {
        tabListRef.current.className = 'smoothScroll'
        tabListRef.current.scrollLeft -= 400;
    }

    const sliderVisible = () => {
        if (tabListRef) {
          let isSliderBoxShadowVisible = tabListRef.current.scrollLeft + tabListRef.current.clientWidth < tabListRef.current.scrollWidth;
          if (isSliderBoxShadowVisible != isRightButtonEnable) {
            setIsRightButtonEnable(isSliderBoxShadowVisible)
          }
        }
      };

    const sliderLeftButtonEnable = () => {
        if (tabListRef) {
          let isAddTabBoxShadowVisible = tabListRef.current.scrollLeft !== 0;
          if (isAddTabBoxShadowVisible !== isLeftButtonEnable) {
              setIsLeftButtonEnable(isAddTabBoxShadowVisible)
          }
        }
      };

    const handleTabListScroll = () => {
        sliderVisible();
        sliderLeftButtonEnable();
    }

    return (
        <div className="tabSection">
            <div className="tabNav">
                <div className="tabSlider" style={{visibility: isSliderEnable ? 'visible' : 'hidden'}}> 
                    <div className={`chevronWrapper ${!isLeftButtonEnable &&'notAllowed'}`} onClick={moveRight} >
                    <span className="chevron left" />
                    </div>
                </div>  
                <ScrollContainer  innerRef={tabListRef} getElement={(v)=>console.log(v)} className="tabList" onScroll={handleTabListScroll} >
                    {tabs.map((item, i)=>{
                        return (
                            <div key={i}  className="tabListContainer">
                                <div  className="tabListItemWrapper">
                                    <div className={`tabListItem ${i == currentTab ? 'activeTab' : 'inActiveTab'}`} onClick={(e)=>handleListItemClick(i, e)} >
                                        <div className="tabListText"> 
                                        {item.label}
                                        </div>
                                    </div>
                                </div> 
                                {tabs.length>1&&<div className="tabDeleteButton" onClick={(e) => handleTabDelete(e, i)}>
                                    {' '}
                                    X{' '}
                                </div>}
                            </div> 
                        )
                    })}
                </ScrollContainer> 
                <div className="tabSlider" style={{visibility: isSliderEnable ? 'visible' : 'hidden'}}>
                    <div onClick={moveLeft} className={`chevronWrapper ${!isRightButtonEnable &&'notAllowed'}`}> 
                        <span className="chevron right" />
                    </div>
                </div>
                <div className={`tabAddButtonWrapper ${tabs.length === TAB_LIMIT &&'notAllowed'}`} onClick={addTab}>
                    <div className="tabAddButton">
                        <span className="plus" />
                    </div>
                </div>
            </div>
            <div className="contentBody">
                {tabs[currentTab].body}
            </div>
            {deleteIndex&&<ConfirmDialogBox tabToBeDelete={tabs[deleteIndex]} confirm={confirmCallback} />}
        </div>
    )
}

export default Tabs;