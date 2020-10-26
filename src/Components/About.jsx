import React from 'react';
import '../MyStyles/AboutStyle.css';
import { Timeline } from 'antd';
import { Box } from '@material-ui/core';

export const About = () => {
    return( 
            <Box id='aboutContainer'>
                <Timeline mode='left'>
                    <Timeline.Item label='1934' className='text'>
                        David was born in Hadera, to Pinhas and Hadassa Mitelman(Mey-Tal)<br/>
                        His father Pinhas was the first Jewish police officer in the Hadera area at the time of the British Mandate.<br/>
                    </Timeline.Item>
                    <Timeline.Item label='1951' className='text'>
                        David graduate in electrical studies in Ort School Kfar Vitkin.<br/>
                        Aged 17, he served as an engine cadet on steam ship "Tel Aviv", one of the first four Israel America Lines flagships, flying the 7 star flag.<br/>
                    </Timeline.Item>
                    <Timeline.Item label='1952' className='text'>
                        David volunteered to regiment 890 of the paratrooper brigade. He conculded his reserve army service ranked as a colonel.
                    </Timeline.Item>
                    <Timeline.Item label='1957' className='text'>
                        David married Rivka eventually building a home to their three children: Amir, Michal and Shay.
                    </Timeline.Item>
                    <Timeline.Item label='1965 - 1969' className='text'>
                        David studied painting in Avni Institute of Painting and Sculpture Arts and History of Art at Tel Aviv University.
                    </Timeline.Item>
                    <Timeline.Item label='1969' className='text'>
                        David, together with his brother Ariel, established an art gallery and two restaurants and worked in tourism.<br/>
                        His main activity in the gallery was guidance and promotion of young artists. He organized delegations and exhibitions of well known painters and sculptors in Israel and abroad.<br/>
                        He painted and exhibited his works in the gallery under the name David the son of Pinhas and also had them exhibited in Canada and USA.<br/>
                    </Timeline.Item>
                    <Timeline.Item label='1984' className='text'>
                        "The Caesarea Port Fortress Ltd." Receives the title of countrywide  "excellent tourist promoter" from the President of Israel, Mr. Chaim Herzog.
                    </Timeline.Item>
                    <Timeline.Item label='1988' className='text'>
                        <a href="https://www.izkor.gov.il/%D7%9E%D7%99-%D7%98%D7%9C%20%D7%90%D7%9E%D7%99%D7%A8/en_34365a04f136a3222f911ae245ce2924" class="Color" target="_blank">His eldest son Amir, was killed in operation "Blue and Brown" in Lebanon.</a><br/>
                        Amir was the commander of battalion 12, Golany brigade at the time of his untimely death.<br/>
                        Since Amir's death, David liquidated his business in Caesarea and he pushed his way back to life through his painting. David express the intensity of his feelings through his paintbrush, continues to talk to Amir and commemorates his memory and legacy.<br/>
                    </Timeline.Item>
                    <Timeline.Item label='1995' className='text'>
                        His first solo exhibition was opened in Haifa Auditorium. 
                    </Timeline.Item>
                    <Timeline.Item className='text'>
                        Since then(1995), his many paintings were exhibited around Israel and adorn forty public establishments with his unique colorful vision, for example:<br/>
                        Natbag 2000, a 60 meter creation is exhibited.<br/>
                        The new central station in Tel Aviv (2m.X7m.)<br/>
                        At the lobby of the Symphonyette Hall in Beer Sheba (2m.X4.5m.)<br/>
                        Biram House and the New Library in Haifa (2m.X4.5m.) Zim House in Haifa<br/>
                        Leumi Bank branches<br/>
                        I.D.F. bases and Gollany bases, and more.
                    </Timeline.Item>
                    <Timeline.Item label='2006' className='text'>
                        <a href="https://www.nli.org.il/he/books/NNL_ALEPH990041280710205171/NLI" class="Color" target="_blank">His book "Speak Father, Speak" was published.</a><br/>
                    </Timeline.Item>
                    <Timeline.Item label='2008' className='text'>
                        Solo show in Metz Art gallery in Jaffa under the sponsorship of Discount Bank and curator Mrs. Shulamit Nus. The exhibition "Twenty in Sixty" expresses twenty work years of David - person, artist and bereaved father - within sixty years of Israel independence. 
                    </Timeline.Item>
                    <Timeline.Item label='2009' className='text'>
                        Solo show in Feinberg House in Hadera, sponsored by the Mayor Mr. Chaim Avitan. The curator of the exhibition, Mrs. Shulamit Nos, curator in charge of the Discount Bank art collection, Mrs. Pnina Kaplanski planning and support, Mrs. Haya Mann, Public Relations.
                        The "Blue Brown" exhibition symbolize by the warm colors the artist uses, the tie to "Blue and Brown" operation which took the life of lieutenant Colonel Amir Mey–Tal, his son.
                        The exhibition was shown in the house of "Nilly" member Avshalom Feinberg, who was recognized as the first soldier of the Israeli MOD and Intelligence community to be killed in service.
                    </Timeline.Item>
                    <Timeline.Item label='August 17, 2020' color="red" className='text'>
                        <a href="https://blinker.co.il/%D7%A9%D7%A8%D7%95%D7%9F/%D7%97%D7%93%D7%A9%D7%95%D7%AA-%D7%A9%D7%A8%D7%95%D7%9F/%D7%97%D7%93%D7%A8%D7%94-%D7%94%D7%A6%D7%99%D7%99%D7%A8-%D7%95%D7%99%D7%95%D7%A8-%D7%99%D7%93-%D7%9C%D7%91%D7%A0%D7%99%D7%9D-%D7%9C%D7%A9%D7%A2%D7%91%D7%A8-%D7%93%D7%95%D7%93-%D7%9E%D7%99-%D7%98/263698/" class="Color" target="_blank">David passed away</a> in the room where he painted his paintings in front of a painting he loved so much surrounded by his entire family.
                    </Timeline.Item>
                </Timeline>
            </Box>
    )
}