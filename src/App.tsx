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
        if (focusedResult < results.length - 1) {
          setFocusedResult(focusedResult + 1);
        }
        break;
      case "ArrowUp":
        if (focusedResult > 0) {
          setFocusedResult(focusedResult - 1);
        }
        break;
      case "Enter":
        handleItemClick(results[focusedResult])
    }
  }

  const handleItemMouseOver = (index: number) => {
    setFocusedResult(index);
  }

  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          isOpen={showDropdown}
          onKeyDown={handleKeydown}
          type="text"
          placeholder="Search something"
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
