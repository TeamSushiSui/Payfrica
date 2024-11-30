import { BsArrowRight } from 'react-icons/bs';
import './SavingsCircle.css'

const SavingsCircle = () => {
    return (
        <div className='savings-circle'>
            <div className='savings-description'>
                <div className='savings-desc-heading1'>
                    <h2>Savings Circle</h2>
                    <p>See all</p>
                </div>
                <div className='savings-display'>
                    <div className='saving-details-card'>
                        <p>WCA Contribution</p>
                        <h2>$699</h2>
                        <small style={{ marginTop: '-20px', fontFamily: 'SansationLight' }}>₦1,123,000</small>
                        <div className='slide'></div>
                    </div>
                    <div className='saving-details-card'>
                        <p>December Sharing</p>
                        <h2>$984</h2>
                        <small style={{ marginTop: '-20px', fontFamily: 'SansationLight' }}>₦1,123,000</small>
                        <div className='slide'></div>
                    </div>
                    <div className='saving-details-card'>
                        <p>Rainy Days</p>
                        <h2>$1,348</h2>
                        <small style={{ marginTop: '-20px', fontFamily: 'SansationLight' }}>₦1,123,000</small>
                        <div className='slide'></div>
                    </div>
                    <div className='saving-details-card'>
                        <p>New Course</p>
                        <h2>$249</h2>
                        <small style={{ marginTop: '-20px', fontFamily: 'SansationLight' }}>₦1,123,000</small>
                        <div className='slide'></div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <h2>Updates</h2>
                    <div className="updates-card">
                        <div className='update-card'>
                            <h2>Time is Money</h2>
                            <p>Save for Rainy Days</p>
                            <p>Learn more <BsArrowRight /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavingsCircle;