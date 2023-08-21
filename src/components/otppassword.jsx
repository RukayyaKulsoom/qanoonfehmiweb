import React, { useState } from 'react';

const Otppassword = ({ navigation }) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');

  const fwdcode = () => {
    let code = first + second + third + fourth;
   
  
  };

  return (
    <div style={styles.main}>
      <h1 style={styles.paragraph}>&nbsp;</h1>

      <div style={styles.topLeft} />

      <div style={{ alignSelf: 'center', top: -60 }}>
        <h2 style={{ color: 'white', fontFamily: 'Kaushan-Regular', fontSize: 22 }}>
          Code Has Been Sent To Your Email
        </h2>
      </div>

      <div style={{ alignSelf: 'center', top: -20, display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <div style={styles.textInput}>
          <input
            type="text"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 5, alignSelf: 'center' }}
            maxLength={1}
          />
        </div>

        <div style={{ ...styles.textInput, marginLeft: 20 }}>
          <input
            type="text"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 5, alignSelf: 'center' }}
            maxLength={1}
          />
        </div>

        <div style={{ ...styles.textInput, marginLeft: 20 }}>
          <input
            type="text"
            value={third}
            onChange={(e) => setThird(e.target.value)}
            style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 5, alignSelf: 'center' }}
            maxLength={1}
          />
        </div>

        <div style={{ ...styles.textInput, marginLeft: 20 }}>
          <input
            type="text"
            value={fourth}
            onChange={(e) => setFourth(e.target.value)}
            style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 5, alignSelf: 'center' }}
            maxLength={1}
          />
        </div>
      </div>

      <button onClick={fwdcode} style={styles.verifyButton}>
        Verify
      </button>

      <button onClick={() => navigation.goBack()} style={styles.backButton}>
        <img  alt="Back Arrow" style={{ width: 14, height: 28, marginLeft: 10 }} />
      </button>
    </div>
  );
};

// Add your styles here
const styles = {
  main: {
    // Add your styles
  },
  paragraph: {
    // Add your styles
  },
  topLeft: {
    // Add your styles
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#D9D9D9',
    padding: 1,
    height: 50,
    width: 40,
  },
  verifyButton: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    width: 150,
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#B0303B',
    fontSize: 22,
    fontFamily: 'Outfit-Regular',
    cursor: 'pointer',
  },
  backButton: {
    marginRight: 340,
    bottom: 410,
    marginLeft: 10,
    cursor: 'pointer',
  },
};

export default Otppassword;
