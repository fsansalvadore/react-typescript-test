import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import './App.css';
import styled, {css} from 'styled-components';

const data = [
  "Vlad Reid",
  "Jermaine Denton",
  "Rayan Hunt",
  "Veronica Sullivan",
  "Huda King",
  "Kitty Carty",
  "Abbigail Neal",
  "Humphrey Needham",
  "Brandon-Lee Thompson",
  "Libbie Bennett"
];

function App() {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedResult, setFocusedResult] = useState(-1);
  
  const showDropdown = loading || (!!value.length && !!results.length);

  useEffect(() => {
    if (!value.length) {
      setResults([])
      setFocusedResult(0)
      return 
    }
    setLoading(true);
    setTimeout(() => {
      const resultingData = data.filter(element => element.includes(value))
      setResults(resultingData)
      setLoading(false);
    }, 400)
  }, [value]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value)
  }

  const handleItemClick = (result: string) => {
    // do something
    alert(result)
  }

  const handleKeydown = (e: KeyboardEvent) => {
    const code = e.code
    
    switch (code) {
      case "ArrowDown":
      case "Tab":
        e.preventDefault()
        if (focusedResult < results.length) {
          setFocusedResult(
            focusedResult === results.length - 1
              ? 0
              : focusedResult + 1
          );
        }
        break;
      case "ArrowUp":
        if (focusedResult >= 0) {
          setFocusedResult(focusedResult === 0
            ? results.length - 1
            : focusedResult - 1);
        }
        break;
      case "Enter":
        handleSubmit()
    }
  }

  const handleSubmit = () => {
    setResults([]);
    setLoading(false);
    handleItemClick(results[focusedResult])
    setValue("");
  }

  const handleItemMouseOver = (index: number) => {
    setFocusedResult(index);
  }
  
  const handleClearValue = () => {
    setFocusedResult(0);
    setResults([]);
    setValue("")
  }

  return (
    <Wrapper>
      <InputWrapper>
        <Hint>Use <strong>Tab</strong>, <strong>ArrowUp</strong> or <strong>ArrowDown</strong> keys<br />to navigate results. Hit <strong>Enter</strong> to see result.</Hint>
        <ClearIcon onClick={handleClearValue}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </ClearIcon>
        <StyledInput
          isOpen={showDropdown}
          onKeyDown={handleKeydown}
          type="text"
          placeholder="Search for something..."
          value={value}
          onChange={handleInput}
        />
        {showDropdown && <Dropdown>
          {
            loading
            ? <DropdownButton>loading</DropdownButton>
            : results.map((result, index) =>
              <DropdownButton
                onMouseOver={() => handleItemMouseOver(index)}
                isFocused={focusedResult === index}
                key={result}
                onClick={() => handleItemClick(result)}
                >
                  {result}
                </DropdownButton>
            )
          }
        </Dropdown>}
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
`

const StyledInput = styled.input<{isOpen?: boolean}>`
  width: 300px;
  padding: 10px;
  max-width: 90vw;
  border-radius: 6px;
  border: 1px solid #999;
  margin: 0;

  &:focus {
    outline: none;
  }

  ${({isOpen}) => isOpen && css`
    border-radius: 6px 6px 0 0;
  `}
`

const ClearIcon = styled.button`
  position: absolute;
  z-index: 2;
  right: 0;
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-left: 1px solid #999;
  background-color: transparent;
  border-radius: 0 6px 6px 0;

  &:hover {
    background-color: teal;
    cursor: pointer;

    svg {
      fill: white;
    }
  }
`

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: left;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  border: 1px solid #999;
  border-top: none;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  box-sizing: border-box;
`

const Hint = styled.p`
  font-size: 14px;
  color: #444;
  position: absolute;
  text-align: center;
  bottom: calc(100% + 10px);
  left: 0;
  right: 0;
  width: 100%;
`

const DropdownButton = styled.div<{isFocused?: boolean}>`
  padding: 10px;
  color: #999;

  &:hover {
    cursor: pointer;
    background-color: teal;
    color: white;
  }

  ${({isFocused}) => isFocused && css`
    background-color: teal;
    color: white;
  `}
`

export default App;
