<?php

namespace craft\app\migrations;

use Craft;
use craft\app\db\Migration;
use craft\app\db\Query;
use craft\app\helpers\MigrationHelper;
use yii\helpers\Json;

/**
 * m150403_185142_volumes migration.
 */
class m160708_185142_volume_hasUrls_setting extends Migration
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        if (!$this->db->columnExists('{{%volumes}}', 'hasUrls')) {
            $this->addColumnBefore('{{%volumes}}', 'hasUrls', 'boolean', 'url');
        }

        // Update all Volumes and move the setting from settings column to it's own field
        $volumes = (new Query())
            ->select('id, settings')
            ->from('{{%volumes}}')
            ->all();

        foreach ($volumes as $volume) {
            $settings = Json::decode($volume['settings']);
            $data = [];

            if (!empty($settings['publicURLs'])) {
                $data['hasUrls'] = true;
            }

            unset($settings['publicURLs']);
            $data['settings'] = Json::encode($settings);

            $this->update('{{%volumes}}', $data, ['id' => $volume['id']]);
        }
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m160708_185142_volume_hasUrls_setting cannot be reverted.\n";

        return false;
    }
}