import {
  createOrganFeedback,
  createFeedback
} from '../../api/api.js';
import {
  showToast
} from '../../../utils/util.js'
Component({
  properties: {
    feedType: {
      type: String,
      value: '1'
    },
    organizeId: {
      type: String,
      value: '21'
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    feedback: ''
  },
  methods: {
    clickMask(e) {
      let id = e.currentTarget.dataset.id;
      if (id == 1) {
        this.setData({
          show: false
        })
      }
    },
    getTextAreaValue(e) {
      this.setData({
        feedback: e.detail.value
      })
    },

    confirm() {
      if (!this.data.feedback) {
        showToast('请输入反馈内容');
        return
      }
      let params = {
        content: this.data.feedback,
      }
      if (this.properties.type === 1) {
        params.subjectId = this.data.subjectObj.id
        createFeedback(params).then(res => {
          if (res) {
            showToast('反馈成功！');
            this.setData({
              showFeedbackModal: false
            })
          }
        })
      } else {
        params.organizeId = this.properties.organizeId
        createOrganFeedback(params).then(res => {
          if (res) {
            showToast('反馈成功！');
            this.setData({
              showFeedbackModal: false
            })
          }
        })
      }
      this.setData({
        show: false
      })
    },
  }

})