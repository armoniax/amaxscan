import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import OutsideClickHandler from 'react-outclick'
import './index.scss'
export interface ISelectProps {
  placeholder?: string
  value: string | number
  options: any[]
  setValue: (item: any) => void
  width?: string
}

const Select: React.FunctionComponent<ISelectProps> = ({ placeholder = '', value = null, options = [], setValue, width }) => {
  const selectRef = useRef<HTMLElement | any>(null)
  const [label, setLabel] = useState<string | any>('')
  const [showicon, setShowicon] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const uninstall = useRef(false)

  const selectClick = useCallback(
    () => {
      setIsOpen(!isOpen)
    },
    [isOpen]
  )

  const onOutsideClick = useCallback(
    () => {
      setIsOpen(false)
    },
    []
  )

  useEffect(() => {
    uninstall.current = true
    setLabel(options.find(item => item.value === value)?.label ?? (placeholder || 'Select Status'))
    setShowicon(options.find(item => item.value === value)?.icon ?? null)
    return () => {
      uninstall.current = false
    }
  }, [value, options, placeholder])

  const changeValue = (val: any) => {
    setValue(val)
    setIsOpen(false)
  }


  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className="web-select-layout" >
        <div className="web-select" onClick={selectClick}>
          <div className="web-select-show flex-row-center-center" style={{ minWidth: width }}>
            {
              showicon ? <img className="options-left-icon" src={showicon} /> : null
            }
            <span>{label}</span>
          </div>
          <div className={classnames('web-select-arrow', { rotating: isOpen })} />
        </div>
        {isOpen ? (
          <div className={classnames('web-select-options', { open: isOpen })} ref={selectRef}>
            <ul>
              {options.map((item: any, index) => (
                <li
                  className={classnames({ 'sub-item': item.master })}
                  onClick={() => changeValue(item.value)}
                  key={item.value}
                >
                  {
                    item.icon ? <img className="options-left-icon" src={item.icon} /> : null
                  }
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </OutsideClickHandler>
  )
}

export default memo(Select)
