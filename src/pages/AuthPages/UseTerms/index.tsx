import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { TERM_TEXT, TERMS } from 'src/pages/AuthPages/UseTerms/mock';

function UseTerms() {

  return (
    <div className="grid d-flex flex-column align-items-center">
      <Typography variant="h2" className="d-flex text-center mt-64">
        Утверждено<br/>
        Приказом Генерального директора ТОО «Эдюкейшн Системс Продакшн»<br/>
        А.Кузьмин<br/>
        Приказ №3 от 19.08.2020
      </Typography>
      <Typography variant="h1" className="mt-32">ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</Typography>
      {TERM_TEXT.map(e => (
        <Typography variant="text" className="mt-16" key={e.title}>
          <div dangerouslySetInnerHTML={{ __html: e.text }}  />
        </Typography>
      ))}
      {TERMS.map(e => (
        <div className="mt-32">
          <Typography variant="text">{e.text}</Typography>
          <ol className="ml-32 mt-16">
            {e.terms.map(n => (
              <li className="mt-12">
                <div dangerouslySetInnerHTML={{ __html: n }} />
              </li>
            ))}
          </ol>
        </div>
      ))}
      <Typography variant="text" className="mt-64 mb-64">
        Данные условия составлены на основании публичного документа&nbsp;
        <a href="https://www.docracy.com/0ayrstf99j0/github-com-terms-of-service-tos"> Github.com — Terms Of Service</a>
      </Typography>
    </div>
  );
}

export default UseTerms;
