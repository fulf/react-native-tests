import React, {useCallback, useEffect, useMemo} from 'react';

type DebugWrapperProps = {
  children: React.ReactNode;
};

type RequestType = {
  input: RequestInfo | URL;
  init?: RequestInit;
  response?: Response;
};

type MockType = {
  uri: RequestInfo | URL;
  status: number;
  body: any;
};

const defaultPromiseSolve: Response = {
  status: 200,
  headers: new Headers(),
  ok: true,
  statusText: 'OK',
  type: 'basic',
  redirected: false,
  url: '',
  body: null,
  bodyUsed: false,
  clone: () => defaultPromiseSolve,
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  blob: () => Promise.resolve(new Blob()),
  formData: () => Promise.resolve(new FormData()),
  json: () => Promise.resolve(null),
  text: () => Promise.resolve(''),
};

export const RequestContext = React.createContext<
  | {
      requests: RequestType[];
    }
  | undefined
>(undefined);

export const MockContext = React.createContext<
  | {
      mocks: MockType[];
      addMock: (mock: MockType) => void;
      clearMocks: () => void;
    }
  | undefined
>(undefined);

const DebugWrapper: React.FC<DebugWrapperProps> = ({children}) => {
  const _requests = useMemo<RequestType[]>(() => [], []);
  const _mocks = useMemo<MockType[]>(() => [], []);

  const enhanceFetch = () => {
    const _fetch = global.fetch;
    global.fetch = (
      input: string | Request | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      const idx = _requests.length;

      _requests.push({input, init});

      let mock: MockType | undefined;

      if ((mock = _mocks.find(m => m.uri === input))) {
        const mockResponse = {
          ...defaultPromiseSolve,
          url: input.toString(),
          status: mock.status,
          json: () => Promise.resolve(mock!.body),
        };

        return Promise.resolve(mockResponse);
      }

      const fetch = _fetch(input, init);

      fetch.then(response => {
        _requests[idx].response = response;
      });

      return fetch;
    };
  };

  const requests = useMemo(() => _requests, [_requests]);
  const mocks = useMemo(() => _mocks, [_mocks]);
  const addMock = useCallback((mock: MockType) => _mocks.push(mock), [_mocks]);
  const clearMocks = useCallback(
    () => _mocks.splice(0, _mocks.length),
    [_mocks],
  );

  useEffect(enhanceFetch, []);

  return (
    <MockContext.Provider value={{mocks, addMock, clearMocks}}>
      <RequestContext.Provider value={{requests}}>
        {children}
      </RequestContext.Provider>
    </MockContext.Provider>
  );
};

export default DebugWrapper;
